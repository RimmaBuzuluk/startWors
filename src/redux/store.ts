import usersReducer from './slices/userSlice';
// import savedUsersReducer from './slices/savedUserSlice';

import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

export const store = configureStore({
	reducer: {
		users: usersReducer,
		// savedUsers: savedUsersReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
