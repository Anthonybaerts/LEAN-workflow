import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, Clock, Group, Briefcase } from '../../icons';
import { theme } from '../../tokens';
import { variantToToken } from '@/ui/theme/taskColors';

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
  const tokens = variantToToken[color];

  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.8}
      onPress={onPress}
      hitSlop={hitSlop}
      style={[
        styles.wrapper,
        {
          backgroundColor: tokens.bg,
          borderLeftColor: tokens.border,
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
