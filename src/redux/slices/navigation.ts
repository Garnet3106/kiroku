import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NavigationRoute, NavigationRoutePath } from '../../navigation';

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    path: NavigationRoutePath.Initialization,
  },
  reducers: {
    jumpTo: (_state, action: PayloadAction<NavigationRoute>) => action.payload,
  },
});

export default navigationSlice.actions;
