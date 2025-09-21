import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Slot, useRouter, useSegments } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { Firebase } from '@/services/firebase';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  React.useEffect(() => {
    const unsub = onAuthStateChanged(Firebase.auth(), (user) => {
      const inAuthFlow = segments[0] === 'auth_flow';
      if (user) {
        // If authenticated, go to calendar
        router.replace('/CalendarScreen');
      } else if (!inAuthFlow) {
        // If not authenticated, send to login
        router.replace('/auth_flow/Login');
      }
    });
    return () => unsub();
  }, [router, segments]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}


