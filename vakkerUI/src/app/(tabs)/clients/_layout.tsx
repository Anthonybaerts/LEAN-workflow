import React from 'react';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { theme } from '@/ui/tokens';

export default function ClientsStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.colors.gray[900] } }}>
      <Stack.Screen name="index" options={{ headerShown: false, freezeOnBlur: true }} />
      <Stack.Screen
        name="new-client"
        options={{ headerShown: false, presentation: 'fullScreenModal', freezeOnBlur: true, animation: 'slide_from_bottom', contentStyle: { backgroundColor: theme.colors.gray[900] } }}
      />
      <Stack.Screen
        name="client-info"
        options={{ headerShown: false, presentation: 'fullScreenModal', freezeOnBlur: true, animation: 'slide_from_bottom', contentStyle: { backgroundColor: theme.colors.gray[900] } }}
      />
      {/** new-client moved to /(modals). Keep route name absent here. */}
      <Stack.Screen
        name="edit-client"
        options={{ headerShown: false, presentation: 'fullScreenModal', freezeOnBlur: true, animation: 'slide_from_bottom', contentStyle: { backgroundColor: theme.colors.gray[900] } }}
      />
    </Stack>
  );
}


