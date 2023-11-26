import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InitializationPageIndex, NavigationRoute, NavigationRoutePath } from '../../navigation';
import { Auth } from '../../auth';

const initialState: NavigationRoute = Auth.isSignedIn() ? {
  path: NavigationRoutePath.Home,
  params: {},
} : {
  path: NavigationRoutePath.Initialization,
  params: {
    pageIndex: 0,
  },
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    jumpTo: (_state, action: PayloadAction<NavigationRoutePath>) => ({
      path: action.payload,
      params: {},
    }),
    jumpToWithParams: (_state, action: PayloadAction<NavigationRoute>) => action.payload,
    jumpToInitialization: (_state, action: PayloadAction<InitializationPageIndex>) => ({
      path: NavigationRoutePath.Initialization,
      params: {
        pageIndex: action.payload,
      },
    }),
  },
});

export const navigationActions = navigationSlice.actions;
