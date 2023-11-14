import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InitializationPageIndex, NavigationRoute, NavigationRoutePath } from '../../navigation';

const initialState: NavigationRoute = {
  path: NavigationRoutePath.Initialization,
  params: {
    pageIndex: 0,
  },
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    jumpTo: (_state, action: PayloadAction<NavigationRoute>) => action.payload,
    jumpToInitialization: (_state, action: PayloadAction<InitializationPageIndex>) => ({
      path: NavigationRoutePath.Initialization,
      params: {
        pageIndex: action.payload,
      },
    }),
  },
});

export default navigationSlice.actions;
