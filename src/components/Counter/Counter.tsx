import React, { FC } from 'react';
import classNames from 'classnames';
import { ICounterProps } from './Counter.props';
import styles from './Counter.module.css';

export const Counter: FC<ICounterProps> = ({ className, ...props }) => {

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<button className={styles.btn}>-</button>
			<span className={styles.value}>0</span>
			<button className={styles.btn}>+</button>
		</div>
	);
}