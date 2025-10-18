import React from 'react';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { theme } from '@/ui/tokens';

export default function ClientsStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="client-info"
        options={{ headerShown: false, presentation: 'fullScreenModal' }}
      />
      {/** new-client moved to /(modals). Keep route name absent here. */}
      <Stack.Screen
        name="edit-client"
        options={{ headerShown: false, presentation: 'fullScreenModal' }}
      />
    </Stack>
  );
}


