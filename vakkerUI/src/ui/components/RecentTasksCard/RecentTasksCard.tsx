/**
 * RecentTasksCard Component
 * @description Recent tasks card with task items and tags
 * @example
 * ```tsx
 * import { RecentTasksCard } from '@ui/components';
 * import { Clock } from '@ui/icons';
 *
 * <RecentTasksCard
 *   title="Recent Tasks"
 *   titleIcon={<Clock />}
 *   actionText="View All"
 *   onActionPress={() => console.log('view all')}
 *   tasks={[
 *     {
 *       name: "Follow up call",
 *       date: "Jan 15",
 *       time: "2:30 PM",
 *       color: "blue",
 *       tag: { label: "Complete", color: "green" }
 *     }
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
import { Tag } from '../Tag';

export interface TaskItem {
  name: string;
  date: string;
  time: string;
  color: 'blue' | 'green' | 'yellow' | 'gray';
  tag?: {
    label: string;
    color: 'blue' | 'green' | 'yellow' | 'gray';
  };
}

export interface RecentTasksCardProps {
  /**
   * Card title
   */
  title: string;

  /**
   * Title icon
   */
  titleIcon?: React.ReactNode;

  /**
   * Action link text
   */
  actionText?: string;

  /**
   * Task items
   */
  tasks: TaskItem[];

  /**
   * Action press handler
   */
  onActionPress?: () => void;

  /**
   * Custom container style
   */
  style?: ViewStyle;
}

const taskColorMap = {
  blue: theme.colors.primary.main,
  green: theme.colors.success.main,
  yellow: theme.colors.warning.main,
  gray: theme.colors.gray[500],
} as const;

export function RecentTasksCard({
  title,
  titleIcon,
  actionText,
  tasks,
  onActionPress,
  style,
}: RecentTasksCardProps) {
  return (
    <Card style={[styles.container, style]}>
      <View style={styles.header}>
        <View style={styles.titleSection}>
          {titleIcon}
          <Text style={styles.title}>{title}</Text>
        </View>

        {actionText && onActionPress && (
          <TouchableOpacity onPress={onActionPress} activeOpacity={0.7}>
            <Text style={styles.actionText}>{actionText}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        {tasks.map((task, index) => (
          <View key={index} style={styles.taskItem}>
            <View
              style={[
                styles.taskIndicator,
                { backgroundColor: taskColorMap[task.color] },
              ]}
            />

            <View style={styles.taskContent}>
              <Text style={styles.taskName}>{task.name}</Text>
              <View style={styles.taskMeta}>
                <Text style={styles.taskDate}>{task.date}</Text>
                <Text style={styles.taskSeparator}>•</Text>
                <Text style={styles.taskTime}>{task.time}</Text>
              </View>
            </View>

            {task.tag && <Tag label={task.tag.label} color={task.tag.color} />}
          </View>
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

  actionText: {
    color: theme.colors.primary.main,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.inter,
    fontWeight: theme.typography.fontWeight.normal,
    textAlign: 'center',
    lineHeight: 20,
  },

  content: {
    gap: theme.spacing[3],
  },

  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
  },

  taskIndicator: {
    width: 12,
    height: 12,
    borderRadius: theme.radius.circle,
  },

  taskContent: {
    flex: 1,
    gap: 0,
  },

  taskName: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.inter,
    fontWeight: theme.typography.fontWeight.normal,
    lineHeight: 20,
  },

  taskMeta: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing[1],
  },

  taskDate: {
    color: theme.colors.gray[500],
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.inter,
    fontWeight: theme.typography.fontWeight.normal,
    lineHeight: 16,
  },

  taskSeparator: {
    color: theme.colors.gray[500],
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.inter,
    fontWeight: theme.typography.fontWeight.normal,
    lineHeight: 16,
  },

  taskTime: {
    color: theme.colors.gray[500],
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.inter,
    fontWeight: theme.typography.fontWeight.normal,
    lineHeight: 16,
  },
});
