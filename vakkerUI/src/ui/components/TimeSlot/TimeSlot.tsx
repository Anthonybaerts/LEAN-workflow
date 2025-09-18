import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EventBlock } from '../EventBlock';
import { theme } from '../../tokens';

type EventItem = {
  id: string;
  title: string;
  color?: 'yellow' | 'blue' | 'gray' | 'green';
};

type Props = {
  time: string;
  events?: EventItem[];
};

export function TimeSlot({ time, events = [] }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.timeCol}>
        <Text style={styles.timeText}>{time}</Text>
      </View>
      <View style={styles.eventsCol}>
        {events.map((e) => (
          <EventBlock key={e.id} title={e.title} color={e.color ?? 'blue'} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  timeCol: {
    width: 72,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  timeText: { color: theme.colors.gray[500], fontSize: 14 },
  eventsCol: { flex: 1, flexDirection: 'row', gap: 8 },
});
