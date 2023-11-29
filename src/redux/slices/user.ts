import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../auth';

export const userSlice = createSlice({
  name: 'user',
  initialState: null as User | null,
  reducers: {
    set: (_state, action: PayloadAction<User>) => action.payload,
    unset: () => null,
  },
});

export const userActions = userSlice.actions;
