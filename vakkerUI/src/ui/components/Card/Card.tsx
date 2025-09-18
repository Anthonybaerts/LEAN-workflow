/**
 * Card Component
 * @description Base card container from Vakker design system
 * @example
 * ```tsx
 * import { Card } from '@ui/components';
 *
 * <Card>
 *   <Text>Card content</Text>
 * </Card>
 * ```
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../tokens';

export interface CardProps {
  /**
   * Card content
   */
  children: React.ReactNode;

  /**
   * Custom container style
   */
  style?: ViewStyle;

  /**
   * Card padding
   */
  padding?: keyof typeof theme.spacing;
}

export function Card({ children, style, padding = 4 }: CardProps) {
  return (
    <View
      style={[styles.container, { padding: theme.spacing[padding] }, style]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray[800],
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.gray[700],
  },
});
