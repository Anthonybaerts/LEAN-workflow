import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { CalendarScreen } from '@/ui/screens';

export default function CalendarByDate() {
  const params = useLocalSearchParams<{ date?: string }>();
  const selectedDate = typeof params.date === 'string' ? params.date : undefined;
  return <CalendarScreen selectedDate={selectedDate} hideEmbeddedNav />;
}


