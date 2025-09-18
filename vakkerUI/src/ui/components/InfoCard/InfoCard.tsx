/**
 * InfoCard Component
 * @description Info card component from Vakker design system
 * @example
 * ```tsx
 * import { InfoCard } from '@ui/components';
 *
 * <InfoCard text="Duur: 1 uur" />
 * ```
 */

import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Clock } from '../../icons';
import { theme } from '../../tokens';

export interface InfoCardProps {
  /**
   * Text to display
   */
  text: string;

  /**
   * Custom icon (defaults to Clock)
   */
  icon?: React.ReactNode;
}

export function InfoCard({ text, icon }: InfoCardProps) {
  return (
    <View style={styles.container}>
      {icon || <Clock width={20} height={20} color={theme.colors.gray[700]} />}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing[2],
    paddingHorizontal: theme.spacing[6],
    paddingVertical: theme.spacing[3],
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.gray[700],
    backgroundColor: '#1C2534', // Gray-9 from design
    height: 48,
  },
  text: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
