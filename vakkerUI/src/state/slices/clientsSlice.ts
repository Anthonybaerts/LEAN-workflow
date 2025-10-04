import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ClientEntity } from '@/services/clientsRepository';

export type ClientsStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface ClientsState {
  items: ClientEntity[];
  status: ClientsStatus;
  error?: string;
}

const initialState: ClientsState = {
  items: [],
  status: 'idle',
};

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    clientsLoading(state) {
      state.status = 'loading';
      state.error = undefined;
    },
    clientsLoaded(state, action: PayloadAction<ClientEntity[]>) {
      state.items = action.payload;
      state.status = 'ready';
      state.error = undefined;
    },
    clientsError(state, action: PayloadAction<string | undefined>) {
      state.status = 'error';
      state.error = action.payload ?? 'Unknown error';
    },
    clientsCleared(state) {
      state.items = [];
      state.status = 'idle';
      state.error = undefined;
    },
  },
});

export const { clientsLoading, clientsLoaded, clientsError, clientsCleared } = clientsSlice.actions;

// Selectors
export const clientsSelectors = {
  selectSlice: (state: { clients: ClientsState }) => state.clients,
  selectItems: (state: { clients: ClientsState }) => state.clients.items,
  selectStatus: (state: { clients: ClientsState }) => state.clients.status,
  selectError: (state: { clients: ClientsState }) => state.clients.error,
};

export default clientsSlice.reducer;


