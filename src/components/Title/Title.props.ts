import { HTMLAttributes, DetailedHTMLProps } from 'react';

export interface ITitleProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
	children: string;
	titleType?: 'h1' | 'h2' | 'h3' | 'h4';
}