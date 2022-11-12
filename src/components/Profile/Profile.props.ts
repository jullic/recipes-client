import { IUser } from './../../interfaces/recipes.interface';
import { HTMLAttributes, DetailedHTMLProps } from 'react';

export interface IProfileProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	user: IUser;
}