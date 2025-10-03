// Bridge for the @env alias used in tsconfig/babel
// This file MUST be safe for the React Native runtime (no Node stdlib).
// Reads config injected via app.config.ts → extra and exposes minimal client env.

let Constants;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  Constants = require('expo-constants').default || require('expo-constants');
} catch (e) {
  Constants = {};
}

const extra = (Constants && (Constants.expoConfig?.extra || Constants.manifest?.extra)) || {};
const firebase = extra.firebase || {};

const ClientEnv = {
  // Useful for conditional logic if needed
  APP_ENV: extra.appEnv || 'development',

  // Firebase Web config
  FIREBASE_API_KEY: firebase.apiKey || '',
  FIREBASE_AUTH_DOMAIN: firebase.authDomain || '',
  FIREBASE_PROJECT_ID: firebase.projectId || '',
  FIREBASE_STORAGE_BUCKET: firebase.storageBucket || '',
  FIREBASE_MESSAGING_SENDER_ID: firebase.messagingSenderId || '',
  FIREBASE_APP_ID: firebase.appId || '',
  FIREBASE_MEASUREMENT_ID: firebase.measurementId,
  // Platform hint for Firebase setup
  PLATFORM: typeof navigator !== 'undefined' && navigator.product === 'ReactNative' ? 'native' : 'web',
};

module.exports = ClientEnv;
