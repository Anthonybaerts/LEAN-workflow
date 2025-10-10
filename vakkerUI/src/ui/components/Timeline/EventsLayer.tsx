import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { EventBlock } from '@ui/components';
import type { TaskEntity } from '@/services/tasksRepository';
import { resolveVariant } from '@/ui/theme/taskColors';
import {
  type TimelineConfig,
  parseHHmmToMinutesFromMidnight,
  computeYAndHeight,
  computeLaneLayout,
} from '@ui/components/Timeline/timelineUtils';

type Props = {
  tasks: TaskEntity[];
  config: TimelineConfig;
  pxPerMinute: number;
  minTouchPx?: number;
  topOffsetPx?: number;
};

type Color = 'yellow' | 'blue' | 'gray' | 'green';

export const EventsLayer = React.memo(function EventsLayer({ tasks, config, pxPerMinute, minTouchPx = 44, topOffsetPx = 0 }: Props) {
  const items = React.useMemo(() => {
    const windowStart = config.startHour * 60;
    const windowEnd = config.endHour * 60;
    const normalized = (tasks || [])
      .map((task) => {
        const s = parseHHmmToMinutesFromMidnight(task.startAt || '');
        if (s == null) {
          console.warn('[EventsLayer] task missing/invalid startAt', task);
          return null;
        }
        const start = s;
        const e = parseHHmmToMinutesFromMidnight(task.endAt || '');
        const endBase = e == null ? start : e;
        const end = Math.max(endBase, start); // guard non-negative duration
        // Filter fully outside window (do not render)
        if (end <= windowStart || start >= windowEnd) return null;
        const { y, height } = computeYAndHeight({
          startAtMinutesFromMidnight: start,
          endAtMinutesFromMidnight: end,
          config,
          pxPerMinute,
          minTouchPx,
        });
      return {
        id: task.id || `${task.startAt}-${task.endAt}-${Math.random()}`,
        y,
        height,
        start,
        end,
        title: task.description || 'Taak',
        color: resolveVariant(task.type),
      } as const;
      })
      .filter(Boolean) as Array<{
        id: string;
        y: number;
        height: number;
        start: number;
        end: number;
        title: string;
        color: Color;
      }>;
    // Overlap grouping: naive sweep for 2-way columns
    const gap = 8; // ~ theme.spacing[2]
    const withLanes = computeLaneLayout(normalized);
    return withLanes.map((it, idx) => ({
      ...it,
      columnIndex: it.laneIndex,
      columnCount: it.laneCount,
      x: it.laneIndex,
      width: it.laneCount > 0 ? 1 / it.laneCount : 1,
      gap,
      zIndex: idx + 1,
    }));
  }, [tasks, config, pxPerMinute, minTouchPx]);

  return (
    <View pointerEvents="box-none" style={styles.layer}>
      {items.map((ev) => {
        const leftPct = `${Math.round(ev.columnIndex * ev.width * 100)}%` as const;
        const widthPct = `${Math.round(ev.width * 100)}%` as const;
        const containerWidthStyle = { left: leftPct, width: widthPct } as const;
        const horizontalGapStyle = ev.laneCount > 1
          ? (ev.columnIndex === 0
            ? { paddingRight: ev.gap / 2 }
            : ev.columnIndex === ev.laneCount - 1
              ? { paddingLeft: ev.gap / 2 }
              : { paddingHorizontal: ev.gap / 2 })
          : null;
        return (
          <View
            key={ev.id}
            pointerEvents="box-none"
            style={[styles.event, { top: ev.y + topOffsetPx, height: ev.height, zIndex: ev.zIndex }, containerWidthStyle, horizontalGapStyle]}
          >
            <EventBlock
              title={ev.title}
              color={ev.color}
              hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
              containerStyle={{ height: '100%', justifyContent: 'center' }}
            />
          </View>
        );
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  layer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  event: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
});


