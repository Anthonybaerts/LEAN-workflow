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
      ? (theme.colors.warning['20'] ?? 'rgba(255,215,0,0.2)')
      : color === 'green'
        ? theme.colors.success['20']
        : theme.colors.primary['20'];

  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.wrapper,
        {
          backgroundColor: background,
          borderLeftColor: borderColor,
          opacity: pressed ? 0.9 : 1,
        },
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
