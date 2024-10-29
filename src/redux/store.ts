import usersReducer from './slices/userSlice';

import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
