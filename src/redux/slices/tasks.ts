import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Seconds, Task, TaskCategory } from '../../task';
import uuid from 'react-native-uuid';

const initialState: Task[] = [
  {
    id: uuid.v4() as string,
    title: 'FE勉強',
    category: TaskCategory.Study,
    workingDate: {
      start: Seconds.now() / 1000,
      interval: {
        type: 'every',
        interval: 1,
      },
    },
  },
  {
    id: uuid.v4() as string,
    title: 'FE勉強',
    category: TaskCategory.Study,
    workingDate: {
      start: Seconds.now() / 1000,
      interval: {
        type: 'every',
        interval: 1,
      },
    },
  },
];

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    set: (_state, action: PayloadAction<Task[]>) => action.payload,
  },
});

export const tasksActions = tasksSlice.actions;
