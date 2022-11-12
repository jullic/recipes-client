import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { ICounterProps } from './Counter.props';
import styles from './Counter.module.css';

export const Counter: FC<ICounterProps> = ({ className, startValue, ...props }) => {

	const [value, setValue] = useState(startValue);

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<button className={styles.btn}>-</button>
			<span className={styles.value}>{value}</span>
			<button className={styles.btn}>+</button>
		</div>
	);
}