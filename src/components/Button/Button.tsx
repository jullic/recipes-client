import React, { FC } from 'react';
import classNames from 'classnames';
import { IButtonProps } from './Button.props';
import styles from './Button.module.css';

export const Button: FC<IButtonProps> = ({ className, btnType = 'text', color = 'black', ...props }) => {

	return (
		<button className={
			classNames(styles.root, className, {
				[styles.icon]: btnType === 'icon',
				[styles.text]: btnType === 'text',
			}, [styles[color]])
		} {...props}>

		</button>
	);
}