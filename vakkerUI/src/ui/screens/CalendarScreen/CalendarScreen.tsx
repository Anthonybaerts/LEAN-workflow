/**
 * CalendarScreen Component
 * @description Calendar screen displaying schedule with time slots and events
 * @example
 * ```tsx
 * import { CalendarScreen } from '@ui/screens';
 * <CalendarScreen />
 * ```
 */

import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import { Header, TimeSlot } from '../../components';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Group,
} from '../../icons';
import { theme } from '../../tokens';

type Props = {
  selectedDate?: string;
  selectedMonth?: string;
  onDateEdit?: () => void;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  hideEmbeddedNav?: boolean;
};

export function CalendarScreen({
  selectedDate = 'Donderdag, 2 November',
  selectedMonth = 'November 2023',
  onDateEdit,
  onPrevMonth,
  onNextMonth,
  hideEmbeddedNav = false,
}: Props) {
  const safeAreaEdges: Edge[] = hideEmbeddedNav ? ['top'] : ['top', 'bottom'];
  // Placeholder data for time slots with events
  const timeSlots = [
    { time: '06:00', events: [] },
    {
      time: '07:00',
      events: [
        { id: '1', title: 'Jansen Inst...', color: 'yellow' as const },
        { id: '2', title: 'Bakker App...', color: 'blue' as const },
      ],
    },
    { time: '08:00', events: [] },
    {
      time: '09:00',
      events: [
        { id: '3', title: 'De Vries Woonh...', color: 'green' as const },
      ],
    },
    { time: '10:00', events: [] },
    {
      time: '11:00',
      events: [
        { id: '4', title: 'Jansen Inst...', color: 'yellow' as const },
        { id: '5', title: 'Bakker App...', color: 'blue' as const },
      ],
    },
    { time: '12:00', events: [] },
    {
      time: '13:00',
      events: [{ id: '6', title: 'Client Name ...', color: 'gray' as const }],
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={safeAreaEdges}>
      <View style={styles.content}>
        {/* Main Header */}
        <View style={styles.headerSection}>
          <Header title="Kalender" />
        </View>

        {/* Month Navigation Header */}
        <View style={styles.navigationHeader}>
          <TouchableOpacity
            onPress={onPrevMonth}
            style={styles.navButton}
            accessibilityRole="button"
            accessibilityLabel="Previous month"
          >
            <ChevronLeft width={28} height={28} color="white" />
          </TouchableOpacity>

          <Text style={styles.monthTitle}>{selectedMonth}</Text>

          <TouchableOpacity
            onPress={onNextMonth}
            style={styles.navButton}
            accessibilityRole="button"
            accessibilityLabel="Next month"
          >
            <ChevronRight width={28} height={28} color="white" />
          </TouchableOpacity>
        </View>

        {/* Calendar Placeholder */}
        <View style={styles.calendarPlaceholder}>
          <Calendar width={32} height={36} color={theme.colors.gray[500]} />
          <Text style={styles.placeholderTitle}>Calendar Placeholder</Text>
          <Text style={styles.placeholderSubtext}>
            This is where the calendar goes.
          </Text>
          <Text style={styles.placeholderSubtext}>
            Don't make it on your own,
          </Text>
          <Text style={styles.placeholderSubtext}>
            wait for a stage in implementation plan.
          </Text>
        </View>
      </View>

      {/* Schedule Section */}
      <View style={styles.scheduleSection}>
        {/* Date Selection */}
        <View style={styles.dateSelection}>
          <Text style={styles.selectedDate}>{selectedDate}</Text>
          <TouchableOpacity
            onPress={onDateEdit}
            accessibilityRole="button"
            accessibilityLabel="Edit date"
          >
            <Pencil width={24} height={24} color={theme.colors.primary.main} />
          </TouchableOpacity>
        </View>

        {/* Time Slots */}
        <View style={styles.timeSlotsContainer}>
          {timeSlots.map((slot) => (
            <View key={slot.time} style={styles.timeSlotWrapper}>
              <TimeSlot time={slot.time} events={slot.events} />
            </View>
          ))}
        </View>
      </View>

      {/* Bottom Navigation (embedded mock) */}
      {hideEmbeddedNav ? null : (
        <View style={styles.bottomNav}>
          <View style={styles.activeNavItem}>
            <Calendar width={28} height={28} color={theme.colors.primary.main} />
            <Text style={styles.activeNavText}>Kalender</Text>
          </View>
          <View style={styles.navItem}>
            <Group width={28} height={28} color={theme.colors.gray[500]} />
            <Text style={styles.navText}>Klanten</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[900],
  },
  content: {
    flex: 1,
  },
  headerSection: {
    paddingHorizontal: theme.spacing[5],
  },
  navigationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing[5],
    paddingVertical: theme.spacing[8],
    backgroundColor: theme.colors.gray[900],
  },
  navButton: {
    padding: theme.spacing[2],
  },
  monthTitle: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
  },
  calendarPlaceholder: {
    marginHorizontal: theme.spacing[5],
    height: 300,
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: theme.colors.gray[600],
    backgroundColor: theme.colors.gray[800],
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[8],
    marginBottom: theme.spacing[4],
  },
  placeholderTitle: {
    color: theme.colors.gray[500],
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: theme.spacing[3],
    marginBottom: theme.spacing[2],
  },
  placeholderSubtext: {
    color: theme.colors.gray[500],
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    opacity: 0.75,
    lineHeight: 20,
  },
  scheduleSection: {
    flex: 1,
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
  timeSlotsContainer: {
    flex: 1,
  },
  timeSlotWrapper: {
    borderBottomWidth: 1,
    borderColor: theme.colors.gray[700],
    paddingHorizontal: theme.spacing[5],
  },
  bottomNav: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing[5],
    paddingVertical: theme.spacing[3],
    borderTopWidth: 1,
    borderColor: theme.colors.gray[700],
    backgroundColor: theme.colors.gray[900],
    gap: theme.spacing[5],
  },
  activeNavItem: {
    flex: 1,
    height: 64,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing[1],
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.primary['20'],
  },
  navItem: {
    flex: 1,
    height: 64,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing[1],
    borderRadius: theme.radius.lg,
  },
  activeNavText: {
    color: theme.colors.primary.main,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  navText: {
    color: theme.colors.gray[500],
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
});
