/**
 * TabSelection Component
 * @description Tab selection component with circle indicator from Vakker design system
 * @example
 * ```tsx
 * import { TabSelection } from '@ui/components';
 *
 * <TabSelection
 *   label="Onderhoud"
 *   color="blue"
 *   active
 * />
 *
 * <TabSelection
 *   label="Project"
 *   color="yellow"
 *   onPress={() => console.log('selected')}
 * />
 * ```
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
  View,
} from 'react-native';
import { theme } from '../../tokens';

export interface TabSelectionProps
  extends Omit<TouchableOpacityProps, 'style'> {
  /**
   * Selection label text
   */
  label: string;

  /**
   * Color variant
   */
  color?: 'blue' | 'green' | 'yellow' | 'gray';

  /**
   * Active/selected state
   */
  active?: boolean;

  /**
   * Custom container style
   */
  style?: ViewStyle;
}

const colorConfig = {
  blue: {
    border: theme.colors.primary['40'],
    background: theme.colors.primary['20'],
    activeBorder: theme.colors.primary.main,
    activeBackground: theme.colors.primary['20'],
  },
  green: {
    border: theme.colors.success['40'],
    background: theme.colors.success['20'],
    activeBorder: theme.colors.success.main,
    activeBackground: theme.colors.success['20'],
  },
  yellow: {
    border: theme.colors.warning['40'],
    background: theme.colors.warning['20'],
    activeBorder: theme.colors.warning.main,
    activeBackground: theme.colors.warning['20'],
  },
  gray: {
    border: theme.colors.gray['300'],
    background: theme.colors.gray['20'],
    activeBorder: theme.colors.gray['200'],
    activeBackground: theme.colors.gray['20'],
  },
} as const;

export function TabSelection({
  label,
  color = 'blue',
  active = false,
  style,
  ...props
}: TabSelectionProps) {
  const config = colorConfig[color];

  const containerStyle = [
    styles.container,
    {
      borderColor: active ? config.activeBorder : config.border,
      backgroundColor: config.background,
    },
    style,
  ];

  const circleStyle = [
    styles.circle,
    {
      borderColor: active ? config.activeBorder : config.border,
      backgroundColor: active ? config.activeBorder : 'transparent',
    },
  ];

  return (
    <TouchableOpacity style={containerStyle} activeOpacity={0.8} {...props}>
      <View style={circleStyle} />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
    paddingHorizontal: theme.spacing[3],
    borderRadius: theme.radius.lg,
    borderWidth: 1,
  },

  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
  },

  text: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
