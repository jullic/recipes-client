import { authsReducer } from './slices/auth.slice';
import { recipesReduser } from './slices/recipes.slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
	reducer: {
		recipes: recipesReduser,
		auth: authsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;