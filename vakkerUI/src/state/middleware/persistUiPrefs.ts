import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Middleware } from '@reduxjs/toolkit';
import { setPrefs } from '../slices/uiSlice';
import type { RootState, AppDispatch } from '../store';

const UI_PREFS_KEY = 'ui.prefs.v1';

export const persistUiPrefsMiddleware: Middleware<{}, RootState> =
  (storeApi) => (next) => (action) => {
    const result = next(action);
    if (setPrefs.match(action)) {
      const prefs = storeApi.getState().ui.prefs;
      AsyncStorage.setItem(UI_PREFS_KEY, JSON.stringify(prefs)).catch(() => {
        // Non-fatal
      });
    }
    return result;
  };

export async function rehydrateUiPrefs(dispatch: AppDispatch) {
  try {
    const raw = await AsyncStorage.getItem(UI_PREFS_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      dispatch(setPrefs(parsed));
    }
  } catch {
    // ignore rehydrate errors
  }
}


