/* eslint-disable @typescript-eslint/no-var-requires */
import type { ConfigContext, ExpoConfig } from '@expo/config';
const { Env, ClientEnv } = require('./env');

export default ({ config }: ConfigContext): ExpoConfig => {
  const androidGoogleServices = './google-services.json';
  const iosGoogleServices = './GoogleService-Info.plist';

  return {
    ...config,
    name: Env.NAME,
    slug: Env.NAME.toLowerCase(),
    scheme: Env.SCHEME,
    ios: {
      ...config?.ios,
      bundleIdentifier: Env.BUNDLE_ID,
      googleServicesFile: iosGoogleServices,
      supportsTablet: true,
    },
    android: {
      ...config?.android,
      package: Env.PACKAGE,
      googleServicesFile: androidGoogleServices,
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
    },
    extra: {
      appEnv: ClientEnv.APP_ENV,
      eas: { projectId: Env.EAS_PROJECT_ID },
      firebase: {
        apiKey: ClientEnv.FIREBASE_API_KEY,
        authDomain: ClientEnv.FIREBASE_AUTH_DOMAIN,
        projectId: ClientEnv.FIREBASE_PROJECT_ID,
        storageBucket: ClientEnv.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: ClientEnv.FIREBASE_MESSAGING_SENDER_ID,
        appId: ClientEnv.FIREBASE_APP_ID,
        measurementId: ClientEnv.FIREBASE_MEASUREMENT_ID,
      },
    },
    plugins: [
      '@react-native-firebase/app',
      '@react-native-firebase/analytics',
    ],
  };
};