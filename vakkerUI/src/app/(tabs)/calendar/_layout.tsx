import React from 'react';
import { Stack } from 'expo-router';

export default function CalendarStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="new-task"
        options={{
          headerShown: false,
          presentation: 'fullScreenModal',
        }}
      />
      <Stack.Screen
        name="edit-task"
        options={{
          headerShown: false,
          presentation: 'fullScreenModal',
        }}
      />
    </Stack>
  );
}


