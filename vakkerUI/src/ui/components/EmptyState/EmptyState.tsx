/**
 * EmptyState Component
 * @description Reusable empty state presentation with optional CTA and icon
 * @example
 * ```tsx
 * import { EmptyState } from '@ui/components';
 *
 * <EmptyState
 *   title="No clients yet"
 *   description="Add your first client to get started."
 *   actionLabel="Add client"
 *   onAction={() => router.push('/(tabs)/clients/new')}
 *   iconName="AddUser"
 * />
 * ```
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../tokens';
import * as Icons from '../../icons';
import { Button } from '../Button';

export interface EmptyStateProps {
  /** Primary heading text */
  title: string;
  /** Supporting description text */
  description?: string;
  /** CTA button label */
  actionLabel?: string;
  /** CTA button handler */
  onAction?: () => void;
  /** Optional icon name mapped from `@/ui/icons` */
  iconName?: keyof typeof Icons;
  /** Optional container style override */
  style?: ViewStyle;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  iconName = 'AddUser',
  style,
}: EmptyStateProps) {
  const IconComponent = iconName ? (Icons as Record<string, React.ComponentType<any>>)[iconName] : undefined;

  return (
    <View style={[styles.container, style]} accessibilityRole="summary">
      {IconComponent ? (
        <IconComponent size={40} color={theme.colors.text.white} />
      ) : null}
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
      {actionLabel && (
        <Button
          variant="primary"
          size="large"
          onPress={onAction}
          style={styles.button}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
        >
          {actionLabel}
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing[6],
    paddingVertical: theme.spacing[8],
    gap: theme.spacing[6],
  },
  title: {
    color: theme.colors.text.white,
    fontFamily: theme.typography.fontFamily.inter,
    fontWeight: theme.typography.fontWeight.semibold,
    fontSize: theme.typography.fontSize.xl,
    textAlign: 'center',
  },
  description: {
    color: theme.colors.gray[400],
    fontFamily: theme.typography.fontFamily.inter,
    fontWeight: theme.typography.fontWeight.normal,
    fontSize: theme.typography.fontSize.base,
    lineHeight: 22,
    textAlign: 'center',
  },
  button: {
    marginTop: theme.spacing[6],
    borderRadius: theme.radius.lg,
  },
});


