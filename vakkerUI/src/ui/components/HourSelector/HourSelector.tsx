/**
 * HourSelector Component
 * @description Hour selector component from Vakker design system
 * @example
 * ```tsx
 * import { HourSelector } from '@ui/components';
 *
 * <HourSelector
 *   label="Starttijd"
 *   time="08:00"
 * />
 *
 * <HourSelector
 *   label="Eindtijd"
 *   time="09:00|"
 *   selected
 * />
 * ```
 */

import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { theme } from '../../tokens';

export interface HourSelectorProps
  extends Omit<TouchableOpacityProps, 'style'> {
  /**
   * Label text (e.g., "Starttijd", "Eindtijd")
   */
  label: string;

  /**
   * Time display (e.g., "08:00", "09:00|")
   */
  time: string;

  /**
   * Selected state
   */
  selected?: boolean;

  /**
   * Custom container style
   */
  style?: any;
}

export function HourSelector({
  label,
  time,
  selected = false,
  style,
  ...props
}: HourSelectorProps) {
  const containerStyle = [styles.container, selected && styles.selected, style];

  return (
    <TouchableOpacity style={containerStyle} activeOpacity={0.8} {...props}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.time}>{time}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 80,
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[2],
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing[2],
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.gray[700],
    backgroundColor: theme.colors.gray[900],
  },
  selected: {
    borderColor: 'rgba(66, 133, 243, 0.60)', // blue-60 from design
  },
  label: {
    color: theme.colors.gray[500],
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 16,
  },
  time: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 28,
  },
});
