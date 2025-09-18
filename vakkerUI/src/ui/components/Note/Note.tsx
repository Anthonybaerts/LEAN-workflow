/**
 * Note Component
 * @description Note item with text and date from Vakker design system
 * @example
 * ```tsx
 * import { Note } from '@ui/components';
 *
 * <Note
 *   text="This is a note about the client meeting"
 *   date="Jan 15, 2024"
 * />
 * ```
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../tokens';

export interface NoteProps {
  /**
   * Note text content
   */
  text: string;

  /**
   * Note date
   */
  date: string;

  /**
   * Custom container style
   */
  style?: ViewStyle;
}

export function Note({ text, date, style }: NoteProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray[700],
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.gray[600],
    padding: theme.spacing[3],
    gap: theme.spacing[2],
  },

  text: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.inter,
    fontWeight: theme.typography.fontWeight.normal,
    lineHeight: 20,
  },

  date: {
    color: theme.colors.gray[500],
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.inter,
    fontWeight: theme.typography.fontWeight.normal,
    lineHeight: 16,
  },
});
