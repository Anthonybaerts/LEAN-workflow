# State Store

Redux Toolkit store, base slices, typed hooks, and selectors.

Folders:
- store.ts
- slices/
- selectors/

Persistence (MVP):
- Middleware saves `ui.prefs` to AsyncStorage on `setPrefs`
- `rehydrateUiPrefs(dispatch)` restores on app start

Firestore sync pattern:
- Start listeners in services; dispatch into slices; return unsubscribe for cleanup


