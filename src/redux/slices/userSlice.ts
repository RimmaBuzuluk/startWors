import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Person } from '../../types/Person';
import { apiRoutes } from '../../utils/constant/apiRouter';
import { ErrorMessages } from '../../utils/constant/error';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async ({ page = 1 }: { page: number }) => {
	const response = await fetch(`${apiRoutes.People}/?page=${page}`);
	const users = await response.json();

	return {
		users: users.results,
		totalUsers: users.count,
		nextPageUrl: users.next,
		previousPageUrl: users.previous,
	};
});

const usersSlice = createSlice({
	name: 'users',
	initialState: {
		users: [] as Person[],
		nextPageUrl: null as string | null,
		previousPageUrl: null as string | null,
		totalUsers: 0,
		status: '',
		error: null as null | string,
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchUsers.pending, state => {
				state.status = 'loading';
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.users = action.payload.users;
				state.nextPageUrl = action.payload.nextPageUrl;
				state.previousPageUrl = action.payload.previousPageUrl;
				state.totalUsers = action.payload.totalUsers;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message || ErrorMessages.FAILED_TO_FETCH_USERS;
			});
	},
});

export default usersSlice.reducer;
