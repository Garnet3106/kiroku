import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { dailyWorkingStatsSlice } from './slices/dailyWorkingStats';
import { navigationSlice } from './slices/navigation';
import { taskInProgressSlice } from './slices/taskInProgress';
import { tasksSlice } from './slices/tasks';
import { userSlice } from './slices/user';
import { workResultSlice } from './slices/workResult';

namespace Redux {
  const reducer = combineReducers({
    dailyWorkStats: dailyWorkingStatsSlice.reducer,
    navigation: navigationSlice.reducer,
    taskInProgress: taskInProgressSlice.reducer,
    tasks: tasksSlice.reducer,
    user: userSlice.reducer,
    workResult: workResultSlice.reducer,
  });

  export type RootState = ReturnType<typeof reducer>;

  export const store = configureStore({ reducer });
}

export default Redux;
