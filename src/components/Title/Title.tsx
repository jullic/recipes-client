import React, { FC } from 'react';
import classNames from 'classnames';
import { ITitleProps } from './Title.props';
import styles from './Title.module.css';

export const Title: FC<ITitleProps> = ({ className, titleType = 'h1', children, ...props }) => {

	switch (titleType) {
		case 'h1':
			return (
				<h1 className={classNames(styles.h1, className)} {...props}>
					{children}
				</h1>
			);
		case 'h2':
			return (
				<h2 className={classNames(styles.h2, className)} {...props}>
					{children}
				</h2>
			);
		case 'h3':
			return (
				<h3 className={classNames(styles.h3, className)} {...props}>
					{children}
				</h3>
			);
		case 'h4':
			return (
				<h4 className={classNames(styles.h4, className)} {...props}>
					{children}
				</h4>
			);
	}
}