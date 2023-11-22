import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DayOfWeek, Seconds, Task, TaskCategory, TaskIntervalType } from '../../task';
import uuid from 'react-native-uuid';

const initialState: Task[] = [
  {
    id: uuid.v4() as string,
    title: 'FE勉強',
    category: TaskCategory.Study,
    targetTime: 60,
    workingDate: {
      start: Seconds.now() / 1000,
      interval: {
        type: TaskIntervalType.Day,
        interval: 1,
      },
    },
  },
  {
    id: uuid.v4() as string,
    title: '受験勉強',
    category: TaskCategory.Study,
    targetTime: 100,
    workingDate: {
      start: Seconds.now() / 1000,
      interval: {
        type: TaskIntervalType.Week,
        interval: 2,
        days: {
          [DayOfWeek.Monday]: false,
          [DayOfWeek.Tuesday]: false,
          [DayOfWeek.Wednesday]: false,
          [DayOfWeek.Thursday]: false,
          [DayOfWeek.Friday]: false,
          [DayOfWeek.Saturday]: false,
          [DayOfWeek.Sunday]: false,
        },
      },
    },
  },
];

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    set: (_state, action: PayloadAction<Task[]>) => action.payload,
    add: (state, action: PayloadAction<Task>) => [...state, action.payload],
    edit: (state, action: PayloadAction<Task>) => {
      const newState = [...state];
      const index = newState.findIndex((v) => v.id === action.payload.id);

      if (index !== -1) {
        newState[index] = action.payload;
      }

      return newState;
    },
    delete: (state, action: PayloadAction<string>) => [...state].filter((v) => v.id !== action.payload),
  },
});

export const tasksActions = tasksSlice.actions;
