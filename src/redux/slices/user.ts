import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../auth';
import { Language } from '../../translations';

export const userSlice = createSlice({
  name: 'user',
  initialState: null as User | null,
  reducers: {
    set: (_state, action: PayloadAction<User>) => action.payload,
    setLanguage: (state, action: PayloadAction<Language>) => {
      if (!state) {
        return null;
      }

      const newState = {...state};
      newState.language = action.payload;
      return newState;
    },
    unset: () => null,
  },
});

export const userActions = userSlice.actions;
