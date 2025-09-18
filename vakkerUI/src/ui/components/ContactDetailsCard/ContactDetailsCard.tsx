/**
 * ContactDetailsCard Component
 * @description Contact details card with edit functionality
 * @example
 * ```tsx
 * import { ContactDetailsCard } from '@ui/components';
 * import { ContactCard, User, Call, Email, Location, Pencil } from '@ui/icons';
 *
 * <ContactDetailsCard
 *   title="Contact Details"
 *   onEdit={() => console.log('edit')}
 *   items={[
 *     { icon: <User />, label: "Contact Person", text: "John Doe" },
 *     { icon: <Call />, label: "Phone", text: "(555) 123-4567" },
 *     { icon: <Email />, label: "Email", text: "john@example.com" },
 *     { icon: <Location />, label: "Address", text: "123 Main St" },
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

export interface ContactDetailsItem {
  icon: React.ReactNode;
  label: string;
  text: string;
  isEmpty?: boolean;
}

export interface ContactDetailsCardProps {
  /**
   * Card title
   */
  title: string;

  /**
   * Title icon
   */
  titleIcon?: React.ReactNode;

  /**
   * Edit icon
   */
  editIcon?: React.ReactNode;

  /**
   * Contact details items
   */
  items: ContactDetailsItem[];

  /**
   * Edit button press handler
   */
  onEdit?: () => void;

  /**
   * Custom container style
   */
  style?: ViewStyle;
}

export function ContactDetailsCard({
  title,
  titleIcon,
  editIcon,
  items,
  onEdit,
  style,
}: ContactDetailsCardProps) {
  return (
    <Card style={[styles.container, style]}>
      <View style={styles.header}>
        <View style={styles.titleSection}>
          {titleIcon}
          <Text style={styles.title}>{title}</Text>
        </View>

        {editIcon && onEdit && (
          <TouchableOpacity onPress={onEdit} activeOpacity={0.7}>
            {editIcon}
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        {items.map((item, index) => (
          <CardItem
            key={index}
            icon={item.icon}
            label={item.label}
            text={item.text}
            variant="details"
            isEmpty={item.isEmpty}
          />
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing[4],
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
    flex: 1,
  },

  title: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.inter,
    fontWeight: theme.typography.fontWeight.semibold,
  },

  content: {
    gap: theme.spacing[3],
  },
});
