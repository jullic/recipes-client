import { IRecipe } from './../../interfaces/recipes.interface';
import { HTMLAttributes, DetailedHTMLProps } from 'react';

export interface IStepProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	recipe: IRecipe;
}