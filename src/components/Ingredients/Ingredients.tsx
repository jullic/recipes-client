import React, { FC } from 'react';
import classNames from 'classnames';
import { IIngredientsProps } from './Ingredients.props';
import styles from './Ingredients.module.css';
import { Title } from '../Title/Title';
import { Counter } from '../Counter/Counter';

export const Ingredients: FC<IIngredientsProps> = ({ className, ...props }) => {

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className={styles.header}>
				<Title titleType='h2'>Ингридиенты</Title>
				<div className={styles.counter}>
					<span>Порции</span>
					<Counter />
				</div>
			</div>
			<ul className={styles.list}>
				<li className={styles.item}><span>Молоко</span> <span className={styles.line}></span> <span>100 мл.</span></li>
				<li className={styles.item}><span>Молоко</span> <span className={styles.line}></span> <span>100 мл.</span></li>
				<li className={styles.item}><span>Молоко</span> <span className={styles.line}></span> <span>100 мл.</span></li>
			</ul>

		</div>
	);
}