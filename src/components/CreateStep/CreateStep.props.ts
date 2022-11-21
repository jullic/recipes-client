import { IStep } from './../../interfaces/recipes.interface';
import { HTMLAttributes, DetailedHTMLProps } from 'react';

export interface ICreateStepProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	startStep: IStep & { id: string };
	onUpdateStep: (id: string, updatedStep: IStep & { id: string }) => void;
	onDeleteStep: (id: string) => void;
	canDelete: boolean;
}