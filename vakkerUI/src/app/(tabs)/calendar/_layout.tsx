import React from 'react';
import { Stack } from 'expo-router';
import { theme } from '@/ui/tokens';

export default function CalendarStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.colors.gray[900] } }}>
      <Stack.Screen name="index" options={{ headerShown: false, freezeOnBlur: true }} />
      <Stack.Screen
        name="new-task"
        options={{
          headerShown: false,
          presentation: 'fullScreenModal',
          freezeOnBlur: true,
          animation: 'slide_from_bottom',
          contentStyle: { backgroundColor: theme.colors.gray[900] },
        }}
      />
      <Stack.Screen
        name="new-task/new-client"
        options={{
          headerShown: false,
          presentation: 'fullScreenModal',
          freezeOnBlur: true,
          animation: 'slide_from_bottom',
          contentStyle: { backgroundColor: theme.colors.gray[900] },
        }}
      />
      <Stack.Screen
        name="edit-task"
        options={{
          headerShown: false,
          presentation: 'fullScreenModal',
          freezeOnBlur: true,
          animation: 'slide_from_bottom',
          contentStyle: { backgroundColor: theme.colors.gray[900] },
        }}
      />
    </Stack>
  );
}


