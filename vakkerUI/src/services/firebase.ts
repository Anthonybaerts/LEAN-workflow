import { Platform } from 'react-native';
import Constants from 'expo-constants';
import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { getApps, initializeApp, getApp } from 'firebase/app';
import { getAuth as getWebAuth } from 'firebase/auth';
import { getFirestore as getWebFirestore } from 'firebase/firestore';

type FirebaseExtra = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
};

const extra = (Constants.expoConfig?.extra ?? {}) as { firebase?: FirebaseExtra };

function ensureWebApp() {
  if (getApps().length === 0 && extra.firebase) {
    initializeApp(extra.firebase);
  }
  return getApp();
}

export const Firebase = {
  analytics: () => analytics(),
  auth: () => (Platform.OS === 'web' ? getWebAuth(ensureWebApp()) : auth()),
  firestore: () => (Platform.OS === 'web' ? getWebFirestore(ensureWebApp()) : firestore()),
};