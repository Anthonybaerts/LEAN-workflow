import React from 'react';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function ClientsStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="client-info"
        options={{ headerShown: false, presentation: 'fullScreenModal' }}
      />
      <Stack.Screen
        name="new-client"
        options={{
          headerShown: false,
          presentation: Platform.OS === 'ios' ? 'modal' : 'transparentModal',
          animation: Platform.OS === 'android' ? 'slide_from_bottom' : undefined,
          gestureEnabled: false,
          contentStyle: Platform.OS === 'android' ? { backgroundColor: 'transparent' } : undefined,
        }}
      />
      <Stack.Screen
        name="edit-client"
        options={{ headerShown: false, presentation: 'fullScreenModal' }}
      />
    </Stack>
  );
}


