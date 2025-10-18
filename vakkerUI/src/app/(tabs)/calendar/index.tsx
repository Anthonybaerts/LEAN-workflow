import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import dayjs from 'dayjs';
import 'dayjs/locale/nl';
import { Calendar as RNCalendar, LocaleConfig, DateData } from 'react-native-calendars';
import { theme } from '@/ui/tokens';
import { ChevronLeft, ChevronRight, Pencil } from '@/ui/icons';
import { Header } from '@/ui/components';
import { tasksRepository, type TaskEntity } from '@/services/tasksRepository';
import { TimelineGrid } from '@ui/components/Timeline/TimelineGrid';
import { EventsLayer } from '@ui/components/Timeline/EventsLayer';
import { TimelineHourLabels } from '@ui/components/Timeline/TimelineHourLabels';
import { createTimelineConfig, getWindowMinutes, getPxPerMinute, parseHHmmToMinutesFromMidnight, computeYAndHeight, minutesToHHmmFromWindowStart } from '@ui/components/Timeline/timelineUtils';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  // P1 timeline config (parametric window and grid density only affects lines)
  const timelineConfig = React.useMemo(() => createTimelineConfig({ startHour: 7, endHour: 19, slotMinutes: 30 }), []);
  const windowMinutes = React.useMemo(() => getWindowMinutes(timelineConfig), [timelineConfig]);
  const pxPerMinute = React.useMemo(() => getPxPerMinute({ baselineSlotMinutes: 30, baselineSlotPx: 36 }), []);

  // P2: compute sample positions for validation (no rendering yet)
  const sampleLayouts = React.useMemo(() => {
    const examples = ['07:15', '08:10', '09:45'];
    return examples.map((t) => {
      const start = parseHHmmToMinutesFromMidnight(t) ?? timelineConfig.startHour * 60;
      const end = start + 60; // 1 hour sample
      const { y, height } = computeYAndHeight({
        startAtMinutesFromMidnight: start,
        endAtMinutesFromMidnight: end,
        config: timelineConfig,
        pxPerMinute,
      });
      return { t, y, height };
    });
  }, [timelineConfig, pxPerMinute]);

  // No tap-to-add behavior in P1 (added in later phases)

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerSection}>
        <Header title="Kalender" />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: theme.spacing[6] }}
      >
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

        {/* Timeline container with parametric height and grid overlay (events added in later phases) */}
        <View style={{ marginHorizontal: theme.spacing[5], flexDirection: 'row', gap: theme.spacing[4] }}>
          {/* Left labels */}
          <View style={{ width: 48 }}>
            <View style={{ height: Math.round(windowMinutes * pxPerMinute) + Math.round(theme.spacing[3]), position: 'relative' }}>
              <TimelineHourLabels startHour={timelineConfig.startHour} endHour={timelineConfig.endHour} pxPerMinute={pxPerMinute} topOffsetPx={Math.round(theme.spacing[3])} />
            </View>
          </View>
          {/* Grid + events */}
          <View style={{ flex: 1 }}>
            <Pressable
              onPress={(e) => {
                // Convert press Y to minutes from top of the timeline container
                const y = e.nativeEvent.locationY - Math.round(theme.spacing[3]);
                const minutesFromTop = Math.max(0, y) / pxPerMinute;
                const startAt = minutesToHHmmFromWindowStart({ minutesFromTop, config: timelineConfig, rounding: 5 });
                router.push({ pathname: '/(tabs)/calendar/new-task', params: { date: selectedDate, startAt } } as any);
              }}
            >
              <View style={{ height: Math.round(windowMinutes * pxPerMinute) + Math.round(theme.spacing[3]) }}>
              <TimelineGrid
                startHour={timelineConfig.startHour}
                endHour={timelineConfig.endHour}
                slotMinutes={timelineConfig.slotMinutes}
                pxPerMinute={pxPerMinute}
                  topOffsetPx={Math.round(theme.spacing[3])}
              />
                <EventsLayer tasks={tasks} config={timelineConfig} pxPerMinute={pxPerMinute} topOffsetPx={Math.round(theme.spacing[3])} />
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[900],
  },
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
