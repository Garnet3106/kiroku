import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TaskWorkResult } from '../../task';

export const workResultSlice = createSlice({
  name: 'workResult',
  initialState: null as TaskWorkResult | null,
  reducers: {
    set: (_state, action: PayloadAction<TaskWorkResult>) => action.payload,
    unset: () => null,
  },
});

export const workResultActions = workResultSlice.actions;
