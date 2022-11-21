import { IRecipe } from './../../interfaces/recipes.interface';
import { HTMLAttributes, DetailedHTMLProps } from 'react';

export interface IRecipesProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	recipes: IRecipe[]
}