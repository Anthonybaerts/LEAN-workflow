import React from 'react';
import { Stack } from 'expo-router';
import { theme } from '@/ui/tokens';

export default function ModalStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerBackVisible: false,
        presentation: 'modal',
        animation: 'slide_from_bottom',
        freezeOnBlur: true,
        gestureEnabled: false,
        contentStyle: { backgroundColor: theme.colors.gray[900] },
      }}
    />
  );
}


