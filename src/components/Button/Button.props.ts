import { DetailedHTMLProps, ButtonHTMLAttributes, ReactNode } from 'react';

export interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	children: ReactNode;
	btnType?: 'text' | 'icon';
	color?: 'primary' | 'black' | 'white';
}