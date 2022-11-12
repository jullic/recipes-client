import { HTMLAttributes, DetailedHTMLProps } from 'react';

export interface ILogoProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	isMobale: boolean;
}