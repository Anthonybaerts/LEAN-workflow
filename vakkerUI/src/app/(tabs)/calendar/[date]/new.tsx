import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { NewTaskScreen } from '@/ui/screens';

export default function NewTaskForDate() {
  const params = useLocalSearchParams<{ date?: string }>();
  const selectedDate = typeof params.date === 'string' ? params.date : undefined;
  return <NewTaskScreen selectedDate={selectedDate} />;
}


