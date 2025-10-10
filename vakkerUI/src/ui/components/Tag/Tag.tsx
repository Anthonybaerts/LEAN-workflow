/**
 * Tag Component
 * @description Tag/label component from Vakker design system
 * @example
 * ```tsx
 * import { Tag } from '@ui/components';
 *
 * <Tag label="Completed" color="green" />
 * <Tag label="Pending" color="yellow" />
 * <Tag label="Info" color="blue" />
 * ```
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../tokens';
import { variantToToken } from '@/ui/theme/taskColors';

export interface TagProps {
  /**
   * Tag label text
   */
  label: string;

  /**
   * Tag color variant
   */
  color?: 'blue' | 'green' | 'yellow' | 'gray';

  /**
   * Custom container style
   */
  style?: ViewStyle;
}

const colorMap = {
  blue: { background: variantToToken.blue.bg, text: variantToToken.blue.text },
  green: { background: variantToToken.green.bg, text: variantToToken.green.text },
  yellow: { background: variantToToken.yellow.bg, text: variantToToken.yellow.text },
  gray: { background: variantToToken.gray.bg, text: variantToToken.gray.text },
} as const;

export function Tag({ label, color = 'blue', style }: TagProps) {
  const colors = colorMap[color];

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background }, style]}
    >
      <Text style={[styles.text, { color: colors.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing[2],
    paddingVertical: theme.spacing[1],
    borderRadius: theme.radius.sm,
    alignSelf: 'flex-start',
    minHeight: 24,
    justifyContent: 'center',
  },

  text: {
    fontFamily: theme.typography.fontFamily.inter,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.normal,
    lineHeight: 16,
  },
});
