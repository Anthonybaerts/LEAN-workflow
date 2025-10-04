import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import clientsReducer from './slices/clientsSlice';
import { persistUiPrefsMiddleware } from './middleware/persistUiPrefs';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    clients: clientsReducer,
  },
  middleware: (getDefault) => getDefault().concat(persistUiPrefsMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


