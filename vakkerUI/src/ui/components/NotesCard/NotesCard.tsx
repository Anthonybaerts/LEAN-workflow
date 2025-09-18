/**
 * NotesCard Component
 * @description Notes card with note items and add note button
 * @example
 * ```tsx
 * import { NotesCard } from '@ui/components';
 * import { Pencil } from '@ui/icons';
 *
 * <NotesCard
 *   title="Notes"
 *   titleIcon={<Pencil />}
 *   addButtonText="+ Add Note"
 *   onAddNote={() => console.log('add note')}
 *   notes={[
 *     { text: "Client meeting went well", date: "Jan 15, 2024" },
 *     { text: "Follow up next week", date: "Jan 16, 2024" }
 *   ]}
 * />
 * ```
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../tokens';
import { Card } from '../Card';
import { Note } from '../Note';
import { Button } from '../Button';

export interface NoteItem {
  text: string;
  date: string;
}

export interface NotesCardProps {
  /**
   * Card title
   */
  title: string;

  /**
   * Title icon
   */
  titleIcon?: React.ReactNode;

  /**
   * Add button text
   */
  addButtonText?: string;

  /**
   * Note items
   */
  notes: NoteItem[];

  /**
   * Add note handler
   */
  onAddNote?: () => void;

  /**
   * Custom container style
   */
  style?: ViewStyle;
}

export function NotesCard({
  title,
  titleIcon,
  addButtonText = '+ Add Note',
  notes,
  onAddNote,
  style,
}: NotesCardProps) {
  return (
    <Card style={[styles.container, style]}>
      <View style={styles.header}>
        <View style={styles.titleSection}>
          {titleIcon}
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>

      <View style={styles.content}>
        {notes.map((note, index) => (
          <Note key={index} text={note.text} date={note.date} />
        ))}

        {onAddNote && (
          <Button
            variant="tertiary"
            size="medium"
            showIcon={false}
            onPress={onAddNote}
            style={styles.addButton}
          >
            {addButtonText}
          </Button>
        )}
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

  addButton: {
    backgroundColor: theme.colors.primary['20'],
  },
});
