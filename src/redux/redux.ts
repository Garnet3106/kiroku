import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { navigationSlice } from './slices/navigation';
import { taskInProgressSlice } from './slices/taskInProgress';
import { tasksSlice } from './slices/tasks';
import { userSlice } from './slices/user';
import { workingResultSlice } from './slices/workingResult';

namespace Redux {
  const reducer = combineReducers({
    navigation: navigationSlice.reducer,
    taskInProgress: taskInProgressSlice.reducer,
    tasks: tasksSlice.reducer,
    user: userSlice.reducer,
    workingResult: workingResultSlice.reducer,
  });

  export type RootState = ReturnType<typeof reducer>;

  export const store = configureStore({ reducer });
}

export default Redux;
