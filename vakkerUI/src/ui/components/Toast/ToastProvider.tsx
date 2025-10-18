import React from 'react';
import { AccessibilityInfo } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../tokens';

export type ToastType = 'info' | 'success' | 'error';

export interface ToastOptions {
  message: string;
  type?: ToastType;
  durationMs?: number;
  id?: string;
  announce?: boolean;
}

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  durationMs: number;
}

export interface ToastControls {
  show: (options: ToastOptions) => string;
  dismiss: (id?: string) => void;
  success: (message: string, options?: Partial<Omit<ToastOptions, 'message'>>) => string;
  error: (message: string, options?: Partial<Omit<ToastOptions, 'message'>>) => string;
  info: (message: string, options?: Partial<Omit<ToastOptions, 'message'>>) => string;
}

const ToastContext = React.createContext<ToastControls | null>(null);

export function useToast(): ToastControls {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}

type Props = { children: React.ReactNode };

export function ToastProvider({ children }: Props) {
  const insets = useSafeAreaInsets();
  const [items, setItems] = React.useState<ToastItem[]>([]);
  const timersRef = React.useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const lastMessageRef = React.useRef<{ message: string; at: number } | null>(null);
  const [closingMap, setClosingMap] = React.useState<Record<string, boolean>>({});

  const finalizeRemove = React.useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
    setClosingMap((prev) => {
      const { [id]: _omit, ...rest } = prev;
      return rest;
    });
    const timers = timersRef.current;
    if (timers[id]) {
      clearTimeout(timers[id]);
      delete timers[id];
    }
  }, []);

  const dismiss = React.useCallback((id?: string) => {
    setItems((prev) => {
      if (!prev.length) return prev;
      const targetId = id ?? prev[prev.length - 1]?.id;
      if (!targetId) return prev;
      setClosingMap((m) => ({ ...m, [targetId]: true }));
      return prev;
    });
  }, []);

  const show = React.useCallback((options: ToastOptions) => {
    const now = Date.now();
    const { message, type = 'info', durationMs = 3000, id, announce = true } = options;
    // simple dedupe of consecutive identical messages within 750ms
    const last = lastMessageRef.current;
    if (last && last.message === message && now - last.at < 750) {
      return '';
    }
    lastMessageRef.current = { message, at: now };

    const toastId = id || `${now}-${Math.round(Math.random() * 1e6)}`;
    const item: ToastItem = { id: toastId, message, type, durationMs };
    setItems((prev) => {
      const visible = prev.slice(-2); // keep at most 2 visible
      return [...visible, item];
    });

    // accessibility announcement
    if (announce && message) {
      try {
        AccessibilityInfo.announceForAccessibility(message);
      } catch {}
    }

    // auto-dismiss triggers smooth close
    timersRef.current[toastId] = setTimeout(() => {
      setClosingMap((m) => ({ ...m, [toastId]: true }));
    }, durationMs);
    return toastId;
  }, [dismiss]);

  const success = React.useCallback((message: string, options?: Partial<Omit<ToastOptions, 'message'>>) => {
    return show({ message, type: 'success', ...options });
  }, [show]);

  const error = React.useCallback((message: string, options?: Partial<Omit<ToastOptions, 'message'>>) => {
    return show({ message, type: 'error', durationMs: 4000, ...options });
  }, [show]);

  const info = React.useCallback((message: string, options?: Partial<Omit<ToastOptions, 'message'>>) => {
    return show({ message, type: 'info', ...options });
  }, [show]);

  const value = React.useMemo<ToastControls>(() => ({ show, dismiss, success, error, info }), [show, dismiss, success, error, info]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Overlay viewport */}
      <ToastViewport
        items={items}
        onDismiss={dismiss}
        closingMap={closingMap}
        onFinalizeRemove={finalizeRemove}
        topInset={insets.top}
      />
    </ToastContext.Provider>
  );
}


// Inline viewport and card to avoid module resolution issues
function ToastViewport({
  items,
  onDismiss,
  closingMap,
  onFinalizeRemove,
  topInset,
}: {
  items: ToastItem[];
  onDismiss: (id: string) => void;
  closingMap: Record<string, boolean>;
  onFinalizeRemove: (id: string) => void;
  topInset: number;
}) {
  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <View style={[viewportStyles.stack, { top: topInset + 32 }]} pointerEvents="box-none">
        {items.map((t) => (
          <ToastCard key={t.id} item={t} isClosing={Boolean(closingMap[t.id])} onDismiss={onDismiss} onFinalizeRemove={onFinalizeRemove} />
        ))}
      </View>
    </View>
  );
}

function ToastCard({ item, isClosing, onDismiss, onFinalizeRemove }: { item: ToastItem; isClosing: boolean; onDismiss: (id: string) => void; onFinalizeRemove: (id: string) => void }) {
  const translateY = React.useRef(new Animated.Value(-60)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, { toValue: 0, duration: 220, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 220, useNativeDriver: true }),
    ]).start();
  }, [translateY, opacity]);

  React.useEffect(() => {
    if (!isClosing) return;
    Animated.parallel([
      Animated.timing(translateY, { toValue: -60, duration: 200, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start(() => onFinalizeRemove(item.id));
  }, [isClosing, translateY, opacity, item.id, onFinalizeRemove]);

  const pan = React.useRef(new Animated.Value(0)).current;
  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 6,
      onPanResponderMove: Animated.event([null, { dy: pan }], { useNativeDriver: false }),
      onPanResponderRelease: (_, g) => {
        if (g.dy < -40) {
          Animated.parallel([
            Animated.timing(translateY, { toValue: -60, duration: 180, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 0, duration: 180, useNativeDriver: true }),
          ]).start(() => onFinalizeRemove(item.id));
        } else {
          Animated.spring(pan, { toValue: 0, useNativeDriver: false }).start();
        }
      },
    })
  ).current;

  const backgroundColor = item.type === 'success'
    ? theme.colors.primary.main
    : item.type === 'error'
    ? theme.colors.primary.main
    : theme.colors.gray['800'];

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        viewportStyles.toast,
        { transform: [{ translateY }, { translateY: pan }], opacity, backgroundColor },
      ]}
      accessibilityLiveRegion="polite"
    >
      <Text style={viewportStyles.text}>{item.message}</Text>
    </Animated.View>
  );
}

import { Animated, PanResponder, StyleSheet, Text, View } from 'react-native';
const viewportStyles = StyleSheet.create({
  stack: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: theme.spacing[3],
  },
  toast: {
    maxWidth: 560,
    marginHorizontal: theme.spacing[6],
    paddingHorizontal: theme.spacing[5],
    paddingVertical: theme.spacing[4],
    borderRadius: theme.radius.xl,
    borderWidth: 0,
    shadowColor: theme.colors.black,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[4],
  },
  text: {
    color: theme.colors.text.white,
    fontFamily: theme.typography.fontFamily.inter,
    fontSize: theme.typography.fontSize.base,
    flexShrink: 1,
  },
  
});

