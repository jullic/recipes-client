import { HTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface ITextProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
	children: ReactNode;
	textType?: 'primary' | 'bold' | 'ghost' | 'small';
}