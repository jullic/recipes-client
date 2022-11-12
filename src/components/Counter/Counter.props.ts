import { HTMLAttributes, DetailedHTMLProps } from 'react';

export interface ICounterProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	startValue: number
}