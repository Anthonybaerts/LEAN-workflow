import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ClientInfoScreen } from '@/ui/screens';

export default function ClientInfoById() {
  const params = useLocalSearchParams<{ clientId?: string }>();
  // The screen can read clientId via props later when data layer is introduced
  return <ClientInfoScreen />;
}


