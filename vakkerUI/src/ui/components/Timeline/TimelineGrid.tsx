import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '@/ui/tokens';

type Props = {
  startHour: number;
  endHour: number;
  slotMinutes: number; // visual only
  pxPerMinute: number;
  topOffsetPx?: number;
};

export const TimelineGrid = React.memo(function TimelineGrid({ startHour, endHour, slotMinutes, pxPerMinute, topOffsetPx = 0 }: Props) {
  const hours = Math.max(0, endHour - startHour);
  const windowMinutes = hours * 60;

  const hourLines = React.useMemo(() => {
    const lines: number[] = [];
    for (let h = 0; h <= hours; h += 1) {
      lines.push(h * 60);
    }
    return lines;
  }, [hours]);

  const slotLines = React.useMemo(() => {
    const lines: number[] = [];
    const increment = Math.max(1, slotMinutes);
    for (let m = 0; m <= windowMinutes; m += increment) {
      // Skip positions already covered by hour lines
      if (m % 60 === 0) continue;
      lines.push(m);
    }
    return lines;
  }, [windowMinutes, slotMinutes]);

  return (
    <View style={{ flex: 1 }}>
      {/* slot lines (subtle) */}
      {slotLines.map((m) => (
        <View
          key={`slot-${m}`}
          pointerEvents="none"
          style={[
            styles.line,
            styles.slot,
            { top: Math.round(m * pxPerMinute + topOffsetPx) },
          ]}
        />
      ))}
      {/* hour lines (emphasized) */}
      {hourLines.map((m) => (
        <View
          key={`hour-${m}`}
          pointerEvents="none"
          style={[
            styles.line,
            styles.hour,
            { top: Math.round(m * pxPerMinute + topOffsetPx) },
          ]}
        />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  line: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  slot: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.gray[700],
  },
  hour: {
    height: 1,
    backgroundColor: theme.colors.gray[600],
  },
});


