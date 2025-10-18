import React from 'react';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Calendar, Group } from '@/ui/icons';
import { theme } from '@/ui/tokens';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: Platform.OS === 'ios',
        sceneStyle: { backgroundColor: theme.colors.gray[900] },
        tabBarStyle: {
          backgroundColor: theme.colors.gray[900],
          borderTopColor: theme.colors.gray[700],
        },
        tabBarActiveTintColor: theme.colors.primary.main,
        tabBarInactiveTintColor: theme.colors.gray[500],
      }}
      initialRouteName="calendar"
    >
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Kalender',
          tabBarIcon: ({ color }) => <Calendar width={24} height={24} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="clients"
        options={{
          title: 'Klanten',
          tabBarIcon: ({ color }) => <Group width={24} height={24} color={color as string} />,
        }}
      />
    </Tabs>
  );
}


