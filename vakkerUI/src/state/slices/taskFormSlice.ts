import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TaskFormState = {
  pendingSelectedClientId?: string;
};

const initialState: TaskFormState = {};

export const taskFormSlice = createSlice({
  name: 'taskForm',
  initialState,
  reducers: {
    selectClient(state, action: PayloadAction<string>) {
      state.pendingSelectedClientId = action.payload;
    },
    clearSelection(state) {
      delete state.pendingSelectedClientId;
    },
  },
});

export const { selectClient, clearSelection } = taskFormSlice.actions;
export default taskFormSlice.reducer;


