import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { navigationSlice } from './slices/navigation';

namespace Redux {
  const reducer = combineReducers({
    navigation: navigationSlice.reducer,
  });

  export type RootState = ReturnType<typeof reducer>;

  export const store = configureStore({
    reducer,
  });
}

export default Redux;
