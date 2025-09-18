/**
 * CustomerCard Component
 * @description Customer/client card with navigation
 * @example
 * ```tsx
 * import { CustomerCard } from '@ui/components';
 * import { Briefcase, User, Call, Location, ChevronRight } from '@ui/icons';
 *
 * <CustomerCard
 *   title="Enterprise Client"
 *   subtitle="Business Services"
 *   subtitleIcon={<Briefcase />}
 *   onPress={() => navigation.navigate('CustomerDetails')}
 *   items={[
 *     { icon: <User />, text: "John Smith" },
 *     { icon: <Call />, text: "(555) 123-4567" },
 *     { icon: <Location />, text: "San Francisco, CA" },
 *   ]}
 * />
 * ```
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { theme } from '../../tokens';
import { Card } from '../Card';
import { CardItem } from '../CardItem';

export interface CustomerItem {
  icon: React.ReactNode;
  text: string;
  isEmpty?: boolean;
}

export interface CustomerCardProps {
  /**
   * Card title
   */
  title: string;

  /**
   * Subtitle text
   */
  subtitle?: string;

  /**
   * Subtitle icon
   */
  subtitleIcon?: React.ReactNode;

  /**
   * Navigation/chevron icon
   */
  chevronIcon?: React.ReactNode;

  /**
   * Customer items
   */
  items: CustomerItem[];

  /**
   * Card press handler
   */
  onPress?: () => void;

  /**
   * Custom container style
   */
  style?: ViewStyle;
}

export function CustomerCard({
  title,
  subtitle,
  subtitleIcon,
  chevronIcon,
  items,
  onPress,
  style,
}: CustomerCardProps) {
  const content = (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {chevronIcon}
      </View>

      <View style={styles.content}>
        {subtitle && (
          <View style={styles.subtitleRow}>
            {subtitleIcon && (
              <View style={styles.subtitleIconContainer}>{subtitleIcon}</View>
            )}
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        )}

        <View style={styles.itemsContainer}>
          {items.map((item, index) => (
            <CardItem
              key={index}
              icon={item.icon}
              text={item.text}
              variant="simple"
              isEmpty={item.isEmpty}
            />
          ))}
        </View>
      </View>
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={style}>
        <Card style={styles.container}>{content}</Card>
      </TouchableOpacity>
    );
  }

  return <Card style={[styles.container, style]}>{content}</Card>;
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing[3],
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    flex: 1,
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.inter,
    fontWeight: theme.typography.fontWeight.semibold,
  },

  content: {
    gap: theme.spacing[3],
  },

  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
  },

  subtitleIconContainer: {
    width: 32,
    height: 32,
    backgroundColor: theme.colors.primary['20'],
    borderRadius: theme.radius.circle,
    alignItems: 'center',
    justifyContent: 'center',
  },

  subtitle: {
    flex: 1,
    color: theme.colors.gray[200],
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.inter,
    fontWeight: theme.typography.fontWeight.normal,
    lineHeight: 20,
  },

  itemsContainer: {
    gap: theme.spacing[2],
  },
});
