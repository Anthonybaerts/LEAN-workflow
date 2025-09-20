// Use project env bridge (`@env`) to read Firebase web config injected via app.config.ts
// This avoids depending on expo-constants within the library code.
import Env from '@env';
import { getApps, initializeApp, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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

export const Firebase = {
  auth: () => getAuth(ensureWebApp()),
  firestore: () => getFirestore(ensureWebApp()),
};