import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UiPrefs = {
  theme: 'light' | 'dark' | 'system';
  locale: 'nl' | 'en';
};

type UiState = {
  loading: boolean;
  prefs: UiPrefs;
};

const initialState: UiState = {
  loading: false,
  prefs: {
    theme: 'system',
    locale: 'nl',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setPrefs(state, action: PayloadAction<Partial<UiPrefs>>) {
      state.prefs = { ...state.prefs, ...action.payload };
    },
  },
});

export const { setLoading, setPrefs } = uiSlice.actions;
export default uiSlice.reducer;


