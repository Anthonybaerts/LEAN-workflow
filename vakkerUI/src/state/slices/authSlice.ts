import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  uid: string | null;
  email: string | null;
  status: 'authenticated' | 'unauthenticated' | 'unknown';
};

const initialState: AuthState = {
  uid: null,
  email: null,
  status: 'unknown',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ uid: string; email: string | null }>) {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.status = 'authenticated';
    },
    clearUser(state) {
      state.uid = null;
      state.email = null;
      state.status = 'unauthenticated';
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;


