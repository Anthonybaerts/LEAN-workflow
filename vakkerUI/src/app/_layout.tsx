import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Slot, useRouter, useSegments } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { Firebase } from '@/services/firebase';
import { Provider } from 'react-redux';
import { store } from '@/state/store';
import { useAppDispatch } from '@/state/store';
import { setUser, clearUser } from '@/state/slices/authSlice';
import { rehydrateUiPrefs } from '@/state/middleware/persistUiPrefs';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const dispatch = useAppDispatch?.();

  React.useEffect(() => {
    // Rehydrate UI preferences on startup (non-blocking)
    rehydrateUiPrefs(store.dispatch);
    const unsub = onAuthStateChanged(Firebase.auth(), (user) => {
      const inAuthFlow = segments[0] === 'auth_flow';
      const inTabs = segments[0] === '(tabs)';
      if (user) {
        dispatch && dispatch(setUser({ uid: user.uid, email: user.email ?? null }));
        // Only redirect into tabs if currently in auth flow
        if (inAuthFlow) router.replace('/(tabs)/calendar');
      } else {
        dispatch && dispatch(clearUser());
        // Only redirect to login if not already in auth flow
        if (!inAuthFlow) router.replace('/auth_flow/Login');
      }
    });
    return () => unsub();
  }, [router, segments]);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <Slot />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}


