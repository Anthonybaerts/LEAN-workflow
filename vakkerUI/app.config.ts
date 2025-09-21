/* eslint-disable @typescript-eslint/no-var-requires */
const { Env, ClientEnv } = require('./env');

export default ({ config }: any): any => {
  // RN Firebase native config is not used in Expo Go (JS SDK only). Files removed.

  return {
    ...config,
    name: Env.NAME,
    slug: Env.NAME.toLowerCase(),
    scheme: Env.SCHEME,
    userInterfaceStyle: 'automatic',
    ios: {
      ...config?.ios,
      bundleIdentifier: Env.BUNDLE_ID,
      supportsTablet: true,
    },
    android: {
      ...config?.android,
      package: Env.PACKAGE,
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
    plugins: [],
  };
};