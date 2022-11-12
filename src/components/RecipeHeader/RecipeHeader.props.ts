import { HTMLAttributes, DetailedHTMLProps } from 'react';
import { IRecipe } from '../../interfaces/recipes.interface';

export interface IRecipeHeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	recipe: IRecipe;
}