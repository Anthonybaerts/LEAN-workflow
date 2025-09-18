/**
 * Button Component
 * @description Main button component from Vakker design system with multiple variants
 * @example
 * ```tsx
 * import { Button } from '@ui/components';
 *
 * <Button variant="primary" size="large">
 *   Primary Button
 * </Button>
 *
 * <Button variant="secondary" size="medium" icon={<Call />}>
 *   With Icon
 * </Button>
 * ```
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { theme } from '../../tokens';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  /**
   * Button text content
   */
  children: string;

  /**
   * Button visual variant
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'text';

  /**
   * Button size
   */
  size?: 'large' | 'medium';

  /**
   * Icon to display alongside text
   */
  icon?: React.ReactNode;

  /**
   * Whether to show the icon
   */
  showIcon?: boolean;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Custom container style
   */
  style?: ViewStyle;
}

export function Button({
  children,
  variant = 'primary',
  size = 'large',
  icon,
  showIcon = true,
  disabled = false,
  style,
  ...props
}: ButtonProps) {
  const containerStyle = [
    styles.base,
    styles[`${variant}Container`],
    styles[`${size}Container`],
    disabled && styles[`${variant}DisabledContainer`],
    style,
  ];

  const textStyle = [
    styles.baseText,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles[`${variant}DisabledText`],
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      disabled={disabled}
      activeOpacity={0.8}
      {...props}
    >
      {showIcon && icon}
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.lg,
    gap: theme.spacing[2],
  },

  // Container sizes
  largeContainer: {
    paddingHorizontal: theme.spacing[6],
    paddingVertical: theme.spacing[4],
    minHeight: 56,
  },

  mediumContainer: {
    paddingHorizontal: theme.spacing[5],
    paddingVertical: theme.spacing[3],
    minHeight: 48,
  },

  // Base text
  baseText: {
    fontFamily: theme.typography.fontFamily.inter,
    fontWeight: theme.typography.fontWeight.medium,
    textAlign: 'center',
  },

  // Text sizes
  largeText: {
    fontSize: theme.typography.fontSize.sm,
    lineHeight: 20,
  },

  mediumText: {
    fontSize: theme.typography.fontSize.sm,
    lineHeight: 20,
  },

  // Primary variant
  primaryContainer: {
    backgroundColor: theme.colors.primary.main,
  },

  primaryText: {
    color: theme.colors.white,
  },

  primaryDisabledContainer: {
    backgroundColor: theme.colors.gray[500],
  },

  primaryDisabledText: {
    color: theme.colors.gray[600],
  },

  // Secondary variant
  secondaryContainer: {
    backgroundColor: theme.colors.gray[800],
  },

  secondaryText: {
    color: theme.colors.white,
  },

  secondaryDisabledContainer: {
    backgroundColor: theme.colors.gray[500],
  },

  secondaryDisabledText: {
    color: theme.colors.gray[600],
  },

  // Tertiary variant
  tertiaryContainer: {
    backgroundColor: 'transparent',
  },

  tertiaryText: {
    color: theme.colors.primary.main,
  },

  tertiaryDisabledContainer: {
    backgroundColor: 'transparent',
  },

  tertiaryDisabledText: {
    color: theme.colors.gray[600],
  },

  // Outline variant
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary.main,
  },

  outlineText: {
    color: theme.colors.white,
  },

  outlineDisabledContainer: {
    borderColor: theme.colors.gray[500],
  },

  outlineDisabledText: {
    color: theme.colors.gray[600],
  },

  // Text variant
  textContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },

  textText: {
    color: theme.colors.primary.main,
    fontWeight: theme.typography.fontWeight.normal,
  },

  textDisabledContainer: {
    backgroundColor: 'transparent',
  },

  textDisabledText: {
    color: theme.colors.gray[600],
  },
});
