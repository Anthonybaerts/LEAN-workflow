import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import clientsReducer from './slices/clientsSlice';
import taskFormReducer from './slices/taskFormSlice';
import { persistUiPrefsMiddleware } from './middleware/persistUiPrefs';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    clients: clientsReducer,
    taskForm: taskFormReducer,
  },
  middleware: (getDefault) => getDefault().concat(persistUiPrefsMiddleware),
});

export type RootState = {
  auth: ReturnType<typeof authReducer>;
  ui: ReturnType<typeof uiReducer>;
  clients: ReturnType<typeof clientsReducer>;
  taskForm: ReturnType<typeof taskFormReducer>;
};
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


