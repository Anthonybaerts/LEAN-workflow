import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, Clock, Group, Briefcase } from '../../icons';
import { theme } from '../../tokens';

type Color = 'yellow' | 'blue' | 'gray' | 'green';

export type EventBlockProps = {
  title: string;
  color?: Color;
  onPress?: () => void;
  pressed?: boolean;
  hitSlop?: { top?: number; bottom?: number; left?: number; right?: number };
  containerStyle?: any;
};

const ICON_MAP: Record<Color, React.ComponentType<any>> = {
  yellow: Calendar,
  blue: Group,
  gray: Calendar,
  green: Calendar,
};

export function EventBlock({
  title,
  color = 'blue',
  onPress,
  pressed = false,
  hitSlop,
  containerStyle,
}: EventBlockProps) {
  const Icon = ICON_MAP[color];
  const borderColor =
    color === 'yellow'
      ? theme.colors.warning.main
      : color === 'green'
        ? theme.colors.success.main
        : theme.colors.primary.main;

  const background =
    color === 'yellow'
      ? ((theme.colors as any)?.warning?.['20'] ?? 'rgba(255,215,0,0.2)')
      : color === 'green'
        ? ((theme.colors as any)?.success?.['20'] ?? 'rgba(16,185,129,0.2)')
        : ((theme.colors as any)?.primary?.['20'] ?? 'rgba(59,130,246,0.2)');

  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.8}
      onPress={onPress}
      hitSlop={hitSlop}
      style={[
        styles.wrapper,
        {
          backgroundColor: background,
          borderLeftColor: borderColor,
          opacity: pressed ? 0.9 : 1,
        },
        containerStyle,
      ]}
    >
      <Icon width={20} height={20} />
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderLeftWidth: 3,
  } as any,
  title: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
});
