/**
 * CardItem Component
 * @description Reusable card item with icon and text content
 * @example
 * ```tsx
 * import { CardItem } from '@ui/components';
 * import { User, Call } from '@ui/icons';
 *
 * // Simple item
 * <CardItem
 *   icon={<User />}
 *   text="John Doe"
 * />
 *
 * // Item with label and value
 * <CardItem
 *   icon={<Call />}
 *   label="Phone"
 *   text="(555) 123-4567"
 *   variant="details"
 * />
 * ```
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../tokens';

export interface CardItemProps {
  /**
   * Icon to display
   */
  icon: React.ReactNode;

  /**
   * Main text content
   */
  text: string;

  /**
   * Optional label (for details variant)
   */
  label?: string;

  /**
   * Component variant
   */
  variant?: 'simple' | 'details';

  /**
   * Whether to show N/A for empty content
   */
  isEmpty?: boolean;

  /**
   * Custom container style
   */
  style?: ViewStyle;
}

export function CardItem({
  icon,
  text,
  label,
  variant = 'simple',
  isEmpty = false,
  style,
}: CardItemProps) {
  const isDetails = variant === 'details';
  const displayText = isEmpty ? 'N/A' : text;

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.iconContainer,
          isDetails ? styles.iconContainerLarge : styles.iconContainerSmall,
        ]}
      >
        {icon}
      </View>

      {isDetails ? (
        <View style={styles.detailsContent}>
          {label && <Text style={styles.label}>{label}</Text>}
          <Text style={styles.detailsText}>{displayText}</Text>
        </View>
      ) : (
        <Text style={styles.simpleText}>{displayText}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
    minHeight: 24,
  },

  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary['20'],
    borderRadius: theme.radius.circle,
  },

  iconContainerSmall: {
    width: 24,
    height: 24,
    paddingHorizontal: theme.spacing[1],
  },

  iconContainerLarge: {
    width: 32,
    height: 32,
  },

  simpleText: {
    flex: 1,
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.inter,
    fontWeight: theme.typography.fontWeight.normal,
    lineHeight: 20,
  },

  detailsContent: {
    flex: 1,
    justifyContent: 'center',
    gap: 0,
  },

  label: {
    color: theme.colors.gray[200],
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.inter,
    fontWeight: theme.typography.fontWeight.normal,
    lineHeight: 16,
  },

  detailsText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.inter,
    fontWeight: theme.typography.fontWeight.normal,
    lineHeight: 20,
    minHeight: 20,
  },
});
