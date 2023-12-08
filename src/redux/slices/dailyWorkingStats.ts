import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DailyWorkingStats } from '../../task';

export const dailyWorkingStatsSlice = createSlice({
  name: 'dailyWorkingStats',
  initialState: null as DailyWorkingStats | null,
  reducers: {
    set: (_state, action: PayloadAction<DailyWorkingStats>) => action.payload,
  },
});

export const dailyWorkingStatsActions = dailyWorkingStatsSlice.actions;
