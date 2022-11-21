import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { ICounterProps } from './Counter.props';
import styles from './Counter.module.css';

export const Counter: FC<ICounterProps> = ({ className, startValue, onUpdateValue, ...props }) => {


	return (
		<div className={classNames(styles.root, className)} {...props}>
			<button onClick={() => { onUpdateValue('-') }} className={styles.btn}>-</button>
			<span className={styles.value}>{startValue}</span>
			<button onClick={() => { onUpdateValue('+') }} className={styles.btn}>+</button>
		</div>
	);
}