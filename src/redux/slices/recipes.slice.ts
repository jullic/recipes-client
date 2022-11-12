import { axios } from './../../axios';
import { RootState } from './../store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IRecipe } from '../../interfaces/recipes.interface';
import qs from 'qs';

export const fetchRecipes = createAsyncThunk<IRecipe[], { recipeName: string } | undefined>(
	'recipes/fetchRecipes',
	async (query, { getState }) => {
		const state = getState() as RootState;
		const queryString = qs.stringify({ page: state.recipes.page, limit: state.recipes.limit, recipeName: query?.recipeName });

		const { data } = await axios.get<IRecipe[]>(`/recipes${queryString ? '?' + queryString : ''}`);
		return data;
	}
);

export const fetchFavoriteRecipes = createAsyncThunk<IRecipe[], undefined>(
	'recipes/fetchFavoriteRecipes',
	async () => {
		const { data } = await axios.get<IRecipe[]>(`recipes/favorite/user`);
		return data;
	}
);

export const fetchMyRecipes = createAsyncThunk<IRecipe[], undefined>(
	'recipes/fetchMyRecipes',
	async () => {
		const { data } = await axios.get<IRecipe[]>(`recipes/user`);
		return data;
	}
);

export const fetchOneRecipes = createAsyncThunk<IRecipe, { id: string }>(
	'recipes/fetchOneRecipes',
	async (params) => {
		const { data } = await axios.get<IRecipe>(`recipes/${params.id}`);
		return data;
	}
);

interface IInitialState {
	recipes: IRecipe[];
	page: number;
	limit: number;
	maxPage: number,
	status: 'idle' | 'loading' | 'error';
	recipe: IRecipe | null;
}

const initialState: IInitialState = {
	recipes: [],
	page: 1,
	maxPage: 0,
	limit: 6,
	status: 'idle',
	recipe: null,
};

const recipesSlice = createSlice({
	name: 'recipes',
	initialState,
	reducers: {
		clearRecipes(state) {
			state.page = 1;
			state.recipes = [];
		}
	},
	extraReducers(builder) {
		builder
			.addCase(fetchRecipes.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchRecipes.fulfilled, (state, action) => {
				state.recipes = [...state.recipes, ...action.payload];
				state.page = state.page + 1;
				state.status = 'idle';
			})
			.addCase(fetchRecipes.rejected, (state) => {
				state.status = 'error';
			});

		builder
			.addCase(fetchFavoriteRecipes.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchFavoriteRecipes.fulfilled, (state, action) => {
				state.recipes = [...state.recipes, ...action.payload];
				state.status = 'idle';
			})
			.addCase(fetchFavoriteRecipes.rejected, (state) => {
				state.status = 'error';
			});

		builder
			.addCase(fetchMyRecipes.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchMyRecipes.fulfilled, (state, action) => {
				state.recipes = [...state.recipes, ...action.payload];
				state.status = 'idle';
			})
			.addCase(fetchMyRecipes.rejected, (state) => {
				state.status = 'error';
			});

		builder
			.addCase(fetchOneRecipes.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchOneRecipes.fulfilled, (state, action) => {
				state.recipe = action.payload;
				state.status = 'idle';
			})
			.addCase(fetchOneRecipes.rejected, (state) => {
				state.status = 'error';
			});
	}
});

export const recipesReduser = recipesSlice.reducer;
export const { clearRecipes } = recipesSlice.actions;
