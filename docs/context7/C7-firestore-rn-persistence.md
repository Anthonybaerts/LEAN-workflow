# Context7 Note — Firestore RN Persistence

Summary of references for enabling Firestore offline persistence in React Native.

- Use `initializeFirestore(app, { localCache: persistentLocalCache() })` in RN. Fallback to `getFirestore(app)` if needed.
- Auth persistence in RN uses `getReactNativePersistence(AsyncStorage)` with `initializeAuth` (not applied here yet).

References:
- SDK docs (JS): `initializeFirestore`, `persistentLocalCache`
- Auth RN persistence API: `getReactNativePersistence(AsyncStorage)`


