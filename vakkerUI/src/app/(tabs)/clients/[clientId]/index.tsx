import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ClientInfoScreen } from '@/ui/screens/ClientInfoScreen';

export default function ClientInfoById() {
  const params = useLocalSearchParams<{ clientId?: string }>();
  return <ClientInfoScreen clientId={params.clientId} />;
}


