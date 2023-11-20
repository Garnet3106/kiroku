import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Seconds } from '../../task';

export type TaskInProgress = {
  id: string,
  startedAt: Seconds,
  stopped: boolean,
};

export const taskInProgressSlice = createSlice({
  name: 'taskInProgress',
  initialState: null as TaskInProgress | null,
  reducers: {
    start: (_state, action: PayloadAction<string>) => ({
      id: action.payload,
      startedAt: Seconds.now(),
      stopped: false,
    }),
    stop: (state) => {
      if (state) {
        const newState = {...state};
        newState.stopped = true;
        return newState;
      } else {
        return null;
      }
    },
    resume: (state) => {
      if (state) {
        const newState = {...state};
        newState.stopped = false;
        return newState;
      } else {
        return null;
      }
    },
    finish: () => null,
  },
});

export const taskInProgressActions = taskInProgressSlice.actions;
