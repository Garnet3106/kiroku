import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Seconds } from '../../task';

export type TaskInProgress = {
  id: string,
  startedAt: Seconds,
  stopped: boolean,
  timestampLogs: Seconds[],
};

export const taskInProgressSlice = createSlice({
  name: 'taskInProgress',
  initialState: null as TaskInProgress | null,
  reducers: {
    set: (_state, action: PayloadAction<TaskInProgress>) => action.payload,
    start: (_state, action: PayloadAction<string>) => ({
      id: action.payload,
      startedAt: Seconds.now(),
      stopped: false,
      timestampLogs: [],
    }),
    stop: (state, action: PayloadAction<Seconds>) => {
      if (state) {
        const newState = {...state};
        newState.stopped = true;
        newState.timestampLogs = [...newState.timestampLogs, action.payload];
        return newState;
      } else {
        return null;
      }
    },
    resume: (state, action: PayloadAction<Seconds>) => {
      if (state) {
        const newState = {...state};
        newState.stopped = false;
        newState.timestampLogs = [...newState.timestampLogs, action.payload];
        return newState;
      } else {
        return null;
      }
    },
    finish: () => null,
  },
});

export const taskInProgressActions = taskInProgressSlice.actions;
