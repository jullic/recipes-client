import { IUser } from './../../interfaces/recipes.interface';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axios } from '../../axios';

export const fetchUser = createAsyncThunk<IUser, undefined>(
	'recipes/fetchUser',
	async () => {
		const { data } = await axios.get<IUser>(`/users`);
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
		}
	},
	extraReducers(builder) {
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
export const { logout } = authSlice.actions;