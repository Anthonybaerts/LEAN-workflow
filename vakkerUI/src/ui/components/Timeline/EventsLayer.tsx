import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { EventBlock } from '@ui/components';
import type { TaskEntity } from '@/services/tasksRepository';
import { resolveVariant } from '@/ui/theme/taskColors';
import {
  type TimelineConfig,
  parseHHmmToMinutesFromMidnight,
  computeYAndHeight,
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
    const sorted = [...normalized].sort((a, b) => a.start - b.start);
    let active: typeof normalized = [];
    const result: Array<typeof normalized[number] & { columnIndex: number; columnCount: number; x: number; width: number }> = [];
    const gap = 8; // will match theme spacing 2 approx

    const flushActive = () => {
      if (active.length === 0) return;
      if (active.length === 1) {
        const a = active[0];
        result.push({ ...a, columnIndex: 0, columnCount: 1, x: 0, width: 1 });
      } else if (active.length === 2) {
        // two columns side-by-side
        active.forEach((item, idx) => {
          result.push({ ...item, columnIndex: idx, columnCount: 2, x: idx, width: 0.5 });
        });
      } else {
        // >2: allow visual overlap; stack with z-order by start time
        active.forEach((item) => {
          result.push({ ...item, columnIndex: 0, columnCount: active.length, x: 0, width: 1 });
        });
      }
      active = [];
    };

    for (let i = 0; i < sorted.length; i += 1) {
      const curr = sorted[i];
      if (active.length === 0) {
        active.push(curr);
        continue;
      }
      const last = active[active.length - 1];
      const overlaps = curr.start < last.end && last.start < curr.end;
      if (overlaps) {
        active.push(curr);
      } else {
        flushActive();
        active.push(curr);
      }
    }
    flushActive();

    return result.map((it, idx) => ({ ...it, gap, zIndex: idx + 1 }));
  }, [tasks, config, pxPerMinute, minTouchPx]);

  return (
    <View pointerEvents="box-none" style={styles.layer}>
      {items.map((ev) => {
        const containerWidthStyle = ev.width === 1
          ? { left: 0, right: 0 as const, width: '100%' as const }
          : ev.columnIndex === 0
            ? { left: 0, width: '50%' as const }
            : { right: 0, width: '50%' as const };
        const horizontalGapStyle = ev.width === 0.5 ? (ev.columnIndex === 0 ? { paddingRight: ev.gap / 2 } : { paddingLeft: ev.gap / 2 }) : null;
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


