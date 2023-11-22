import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TaskWorkingResult } from '../../task';

export const workingResultSlice = createSlice({
  name: 'workingResult',
  initialState: null as TaskWorkingResult | null,
  reducers: {
    set: (_state, action: PayloadAction<TaskWorkingResult>) => action.payload,
    unset: () => null,
  },
});

export const workingResultActions = workingResultSlice.actions;
