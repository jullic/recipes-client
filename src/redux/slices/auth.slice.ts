import { IUser } from './../../interfaces/recipes.interface';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axios } from '../../axios';

export const fetchUser = createAsyncThunk<IUser, undefined>(
	'recipes/fetchUser',
	async () => {
		const { data } = await axios.get<IUser>(`/users`);
		return data;
	}
);

export const fetchAuth = createAsyncThunk<{ access_token: string }, { email: string, password: string }>(
	'recipes/fetchAuth',
	async (params, { dispatch }) => {
		const { data } = await axios.post<{ access_token: string }>(`/auth/login`, params);
		dispatch(login(data));
		return data;
	}
);

interface IInitialState {
	access_token: string | null;
	user: IUser | null,
	status: 'idle' | 'loading' | 'error';
}

const initialState: IInitialState = {
	access_token: localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null,
	user: null,
	status: 'idle',
}

const authSlice = createSlice({
	name: 'recipes',
	initialState,
	reducers: {
		logout(state) {
			state.access_token = null;
			localStorage.removeItem('access_token');
		},
		login(state, action: PayloadAction<{ access_token: string }>) {
			state.access_token = action.payload.access_token;
			localStorage.setItem('access_token', action.payload.access_token);
		}
	},
	extraReducers(builder) {
		// builder
		// 	.addCase(fetchAuth.pending, (state) => {
		// 		state.status = 'loading';
		// 	})
		// 	.addCase(fetchAuth.fulfilled, (state) => {
		// 		state.status = 'idle';
		// 	})
		// 	.addCase(fetchAuth.rejected, (state) => {
		// 		state.status = 'error';
		// 	});

		builder
			.addCase(fetchUser.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.status = 'idle';
			})
			.addCase(fetchUser.rejected, (state) => {
				state.status = 'error';
			});
	}
});


export const authsReducer = authSlice.reducer;
export const { logout, login } = authSlice.actions;