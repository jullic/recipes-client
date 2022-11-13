import { IIsFavorite, IFavorite, IUser } from './../../interfaces/recipes.interface';
import { axios } from './../../axios';
import { RootState } from './../store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IRecipe } from '../../interfaces/recipes.interface';
import qs from 'qs';

export const fetchRecipes = createAsyncThunk<(IRecipe & IIsFavorite)[], { recipeName: string } | undefined>(
	'recipes/fetchRecipes',
	async (query, { getState }) => {
		const state = getState() as RootState;
		const queryString = qs.stringify({ page: state.recipes.page, limit: state.recipes.limit, recipeName: query?.recipeName });

		const allRecipes = (await axios.get<IRecipe[]>(`/recipes${queryString ? '?' + queryString : ''}`)).data;
		if (!state.auth.access_token) {
			return allRecipes.map(recipe => ({ ...recipe, isFavorite: false }));
		}
		const favorites = (await axios.get<IFavorite[]>('/recipes/favorite/user')).data
		const recipes = allRecipes.map<IRecipe & IIsFavorite & { users: [IUser] }>((recipe) => {
			return {
				...recipe,
				isFavorite: !!(favorites.find(favRecipe => favRecipe.recipeId === recipe._id))
			}
		});
		return recipes;
	}
);

export const fetchFavoriteRecipes = createAsyncThunk<IFavorite[], undefined>(
	'recipes/fetchFavoriteRecipes',
	async () => {
		const { data } = await axios.get<IFavorite[]>(`recipes/favorite/user`);
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
	async (params, { getState }) => {
		const state = getState() as RootState;
		const startRecipe = (await axios.get<Omit<IRecipe, 'isFavorite'>>(`recipes/${params.id}`)).data;
		if (!state.auth.access_token) {
			return { ...startRecipe, isFavorite: false };
		}
		const isFavorite = (await axios.get(`recipes/favorite/${startRecipe._id}`)).data;
		return { ...startRecipe, isFavorite: !!(isFavorite) };
	}
);

export const fetchAddToFavorite = createAsyncThunk<IFavorite, { recipeId: string }>(
	'recipes/fetchAddToFavorite',
	async (params) => {
		const { data } = await axios.post<IFavorite>(`recipes/favorite`, params);
		console.log(data);
		return data;
	}
);

export const fetchRemoveFromFavorite = createAsyncThunk<{ recipeId: string }, { recipeId: string }>(
	'recipes/fetchRemoveFromFavorite',
	async (params) => {
		const { data } = await axios.delete<IFavorite>(`recipes/favorite`, { data: params });
		console.log(data);
		return { recipeId: data.recipeId };
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
				state.recipes = [...state.recipes, ...action.payload.map(favorite => {
					const recipe = {
						...favorite.favorites[0],
						isFavorite: true,
						users: [favorite.users[0]]
					} as IRecipe;
					return recipe;
				})];
				console.log(state.recipes);
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

		builder
			.addCase(fetchAddToFavorite.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchAddToFavorite.fulfilled, (state, action) => {
				state.recipes = state.recipes.map(recipe => {
					if (recipe._id === action.payload.recipeId) {
						const obj = { ...action.payload.favorites[0], isFavorite: true, users: [action.payload.users[0]] } as IRecipe;
						return obj;
					}
					return { ...recipe };
				});
				if (state.recipe?._id === action.payload.recipeId) {
					state.recipe = { ...state.recipe, isFavorite: true };
				}
				state.status = 'idle';
			})
			.addCase(fetchAddToFavorite.rejected, (state) => {
				state.status = 'error';
			});

		builder
			.addCase(fetchRemoveFromFavorite.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchRemoveFromFavorite.fulfilled, (state, action) => {
				state.recipes = state.recipes.map(recipe => {
					if (recipe._id === action.payload.recipeId) {
						return { ...recipe, isFavorite: false };
					}
					return { ...recipe };
				})
				if (state.recipe?._id === action.payload.recipeId) {
					state.recipe = { ...state.recipe, isFavorite: false };
				}
				state.status = 'idle';
			})
			.addCase(fetchRemoveFromFavorite.rejected, (state) => {
				state.status = 'error';
			});
	}
});

export const recipesReduser = recipesSlice.reducer;
export const { clearRecipes } = recipesSlice.actions;
