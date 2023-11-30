import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Task } from '../../task';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [] as Task[],
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
