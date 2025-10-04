import * as React from 'react';
import { View, Text, StyleSheet, I18nManager } from 'react-native';
import { theme } from '@/ui/tokens';

type Props = {
  startHour: number;
  endHour: number;
  pxPerMinute: number;
  topOffsetPx?: number;
};

export const TimelineHourLabels = React.memo(function TimelineHourLabels({ startHour, endHour, pxPerMinute, topOffsetPx = 0 }: Props) {
  const hours = Math.max(0, endHour - startHour);
  const labels = React.useMemo(() => {
    const arr: { top: number; label: string }[] = [];
    for (let i = 0; i <= hours; i += 1) {
      const hour = startHour + i;
      const topHour = Math.round(i * 60 * pxPerMinute + topOffsetPx) - 7;
      arr.push({ top: topHour, label: `${hour.toString().padStart(2, '0')}:00` });
      if (i < hours) {
        const topHalf = Math.round((i * 60 + 30) * pxPerMinute + topOffsetPx) - 7;
        arr.push({ top: topHalf, label: `${hour.toString().padStart(2, '0')}:30` });
      }
    }
    return arr;
  }, [hours, startHour, pxPerMinute]);

  const isRTL = I18nManager.isRTL;
  return (
    <View style={{ flex: 1 }}>
      {labels.map((it) => (
        <Text key={it.label} style={[styles.label, { top: it.top, textAlign: isRTL ? 'left' : 'right' }]}>
          {it.label}
        </Text>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'right',
    color: theme.colors.gray[600],
    fontSize: 11,
  },
});


