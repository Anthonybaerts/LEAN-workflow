// Use project env bridge (`@env`) to read Firebase web config injected via app.config.ts
// This avoids depending on expo-constants within the library code.
import Env from '@env';
import { getApps, initializeApp, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore, persistentLocalCache, Firestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FirebaseExtra = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
};

const extra: { firebase?: FirebaseExtra } = {
  firebase: {
    apiKey: (Env as any).FIREBASE_API_KEY,
    authDomain: (Env as any).FIREBASE_AUTH_DOMAIN,
    projectId: (Env as any).FIREBASE_PROJECT_ID,
    storageBucket: (Env as any).FIREBASE_STORAGE_BUCKET,
    messagingSenderId: (Env as any).FIREBASE_MESSAGING_SENDER_ID,
    appId: (Env as any).FIREBASE_APP_ID,
    measurementId: (Env as any).FIREBASE_MEASUREMENT_ID,
  },
};

function ensureWebApp() {
  if (getApps().length === 0 && extra.firebase) {
    initializeApp(extra.firebase);
  }
  return getApp();
}

const isWeb = typeof window !== 'undefined' && typeof document !== 'undefined';

export const Firebase = {
  auth: () => {
    const app = ensureWebApp();
    return getAuth(app);
  },
  firestore: (() => {
    let cached: Firestore | undefined;
    return () => {
      if (cached) return cached;
      const app = ensureWebApp();
      try {
        // On web, enable IndexedDB cache; on RN, skip persistentLocalCache due to RN IndexedDB shims.
        if (isWeb) {
          cached = initializeFirestore(app, { localCache: persistentLocalCache() });
        } else {
          cached = getFirestore(app);
        }
      } catch (_err) {
        // Fallback to default instance (no persistent cache)
        cached = getFirestore(app);
      }
      return cached;
    };
  })(),
};