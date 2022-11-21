import { IIngridient } from './../../interfaces/recipes.interface';
import { HTMLAttributes, DetailedHTMLProps } from 'react';

export interface ICreateIngridientProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	startIngridient: IIngridient & { id: string };
	updateIngridient: (id: string, updatedIngridient: IIngridient & { id: string }) => void;
	onDeleteIngridient: (id: string) => void;
	canDelete: boolean;
}