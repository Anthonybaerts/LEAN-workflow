import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, ToastAndroid, Alert } from 'react-native';
import dayjs from 'dayjs';
import 'dayjs/locale/nl';
import { Calendar as RNCalendar, LocaleConfig, DateData } from 'react-native-calendars';
import { useRouter } from 'expo-router';
import { theme } from '@/ui/tokens';
import { ChevronLeft, ChevronRight, Pencil } from '@/ui/icons';
import { Header, TimeSlot } from '@/ui/components';
import { tasksRepository, type TaskEntity } from '@/services/tasksRepository';

// Feature flag to enable task creation navigation (P3)
const enableTaskCreate = true;

// Locale configuration for react-native-calendars (Dutch)
LocaleConfig.locales.nl = {
  monthNames: [
    'januari',
    'februari',
    'maart',
    'april',
    'mei',
    'juni',
    'juli',
    'augustus',
    'september',
    'oktober',
    'november',
    'december',
  ],
  monthNamesShort: [
    'jan.',
    'feb.',
    'mrt.',
    'apr.',
    'mei',
    'jun.',
    'jul.',
    'aug.',
    'sep.',
    'okt.',
    'nov.',
    'dec.',
  ],
  dayNames: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
  dayNamesShort: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
  today: 'Vandaag',
};
LocaleConfig.defaultLocale = 'nl';

function capitalize(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function CalendarIndex() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = React.useState<string>(dayjs().format('YYYY-MM-DD'));
  const [visibleMonth, setVisibleMonth] = React.useState<string>(selectedDate);
  const [tasks, setTasks] = React.useState<TaskEntity[]>([]);
  const unsubscribeRef = React.useRef<null | (() => void)>(null);

  const markedDates = React.useMemo(() => ({
    [selectedDate]: { selected: true, disableTouchEvent: true },
  }), [selectedDate]);

  const selectedDateLabel = React.useMemo(() => {
    const label = dayjs(selectedDate).locale('nl').format('dddd, D MMMM');
    return capitalize(label);
  }, [selectedDate]);

  const selectedMonthLabel = React.useMemo(() => {
    const label = dayjs(visibleMonth).locale('nl').format('MMMM YYYY');
    return capitalize(label);
  }, [visibleMonth]);

  const onDayPress = React.useCallback((day: DateData) => {
    setSelectedDate(day.dateString);
    setVisibleMonth(day.dateString);
  }, []);

  const onPrevMonth = React.useCallback(() => {
    setVisibleMonth((curr) => dayjs(curr).subtract(1, 'month').format('YYYY-MM-DD'));
  }, []);

  const onNextMonth = React.useCallback(() => {
    setVisibleMonth((curr) => dayjs(curr).add(1, 'month').format('YYYY-MM-DD'));
  }, []);

  // Subscribe to tasks for selected date (live mode). Ensure unsubscribe on change and unmount.
  React.useEffect(() => {
    // Cleanup previous subscription
    if (unsubscribeRef.current) {
      try { unsubscribeRef.current(); } catch { /* noop */ }
      unsubscribeRef.current = null;
    }
    let cancelled = false;
    try {
      const unsub = tasksRepository.observeListByDate(selectedDate, undefined, (list) => {
        if (!cancelled) setTasks(list);
      });
      unsubscribeRef.current = unsub;
    } catch (_err) {
      // Likely unauthenticated; fall back to empty
      setTasks([]);
    }
    return () => {
      cancelled = true;
      if (unsubscribeRef.current) {
        try { unsubscribeRef.current(); } catch { /* noop */ }
        unsubscribeRef.current = null;
      }
    };
  }, [selectedDate]);

  // Generate 30-minute slots between 07:00 and 19:00 inclusive
  const slots = React.useMemo(() => {
    const start = dayjs(selectedDate).hour(7).minute(0).second(0);
    const end = dayjs(selectedDate).hour(19).minute(0).second(0);
    const arr: string[] = [];
    let t = start;
    while (t.isBefore(end) || t.isSame(end)) {
      arr.push(t.format('HH:mm'));
      t = t.add(30, 'minute');
    }
    return arr;
  }, [selectedDate]);

  // Map tasks to slot events
  const slotToEvents = React.useMemo(() => {
    const map = new Map<string, { id: string; title: string; color?: 'yellow' | 'blue' | 'gray' | 'green' }[]>();
    for (const s of slots) map.set(s, []);
    for (const task of tasks) {
      const timeKey = (task.startAt ?? '').slice(0, 5);
      if (!map.has(timeKey)) continue;
      const title = task.description || 'Taak';
      const color: 'yellow' | 'blue' | 'gray' | 'green' = task.type === 'green' ? 'green' : task.type === 'yellow' ? 'yellow' : task.type === 'gray' ? 'gray' : 'blue';
      map.get(timeKey)!.push({ id: task.id || `${timeKey}-${Math.random()}`, title, color });
    }
    return map;
  }, [slots, tasks]);

  const handleSlotPress = React.useCallback(
    (startAt: string, hasEvents: boolean) => {
      if (hasEvents) return; // Only tap-to-add on empty slots per spec
      if (!enableTaskCreate) {
        const msg = 'Taak aanmaken binnenkort beschikbaar';
        if (Platform.OS === 'android') {
          ToastAndroid.show(msg, ToastAndroid.SHORT);
        } else {
          Alert.alert(msg);
        }
        return;
      }
      router.push({
        pathname: '/(tabs)/calendar/new-task',
        params: { date: selectedDate, startAt },
      } as any);
    },
    [router, selectedDate]
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.gray[900] }}>
      <FlatList
        data={slots}
        keyExtractor={(time) => time}
        renderItem={({ item: time }) => {
          const events = slotToEvents.get(time) || [];
          const hasEvents = events.length > 0;
          const displayEvents =
            events.length > 2
              ? [...events.slice(0, 2), { id: `${time}-overflow`, title: `+${events.length - 2}`, color: 'gray' as const }]
              : events;
          const content = (
            <View style={styles.timeSlotWrapper}>
              <TimeSlot time={time} events={displayEvents} />
            </View>
          );
          return hasEvents ? (
            content
          ) : (
            <TouchableOpacity activeOpacity={0.8} onPress={() => handleSlotPress(time, hasEvents)}>
              {content}
            </TouchableOpacity>
          );
        }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.headerSection}>
              <Header title="Kalender" />
            </View>
            <RNCalendar
              current={visibleMonth}
              onDayPress={onDayPress}
              onMonthChange={(month: DateData) => setVisibleMonth(month.dateString)}
              firstDay={1}
              markedDates={markedDates}
              hideExtraDays
              enableSwipeMonths
              renderArrow={(direction: 'left' | 'right') =>
                direction === 'left' ? (
                  <ChevronLeft width={24} height={24} color={theme.colors.white} />
                ) : (
                  <ChevronRight width={24} height={24} color={theme.colors.white} />
                )
              }
              theme={{
                backgroundColor: theme.colors.gray[900],
                calendarBackground: theme.colors.gray[900],
                textSectionTitleColor: theme.colors.gray[500],
                selectedDayBackgroundColor: theme.colors.primary.main,
                selectedDayTextColor: theme.colors.white,
                todayTextColor: theme.colors.primary.main,
                dayTextColor: theme.colors.white,
                textDisabledColor: theme.colors.gray[600],
                arrowColor: theme.colors.white,
                monthTextColor: theme.colors.white,
                indicatorColor: theme.colors.primary.main,
              }}
              style={{
                marginHorizontal: theme.spacing[5],
                marginTop: theme.spacing[4],
                marginBottom: theme.spacing[4],
                borderRadius: theme.radius.lg,
                backgroundColor: theme.colors.gray[900],
              }}
            />
            <View style={styles.dateSelection}>
              <Text style={styles.selectedDate}>{selectedDateLabel}</Text>
              <Pencil width={24} height={24} color={theme.colors.primary.main} />
            </View>
          </>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: theme.spacing[6] }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    paddingHorizontal: theme.spacing[5],
  },
  dateSelection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing[5],
    paddingVertical: theme.spacing[3],
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.gray[700],
    backgroundColor: theme.colors.gray[900],
  },
  selectedDate: {
    color: '#FAF9F7',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  timeSlotWrapper: {
    borderBottomWidth: 1,
    borderColor: theme.colors.gray[700],
    paddingHorizontal: theme.spacing[5],
  },
});


