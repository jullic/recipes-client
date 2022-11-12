import React, { FC } from 'react';
import classNames from 'classnames';
import { IIngredientsProps } from './Ingredients.props';
import styles from './Ingredients.module.css';
import { Title } from '../Title/Title';
import { Counter } from '../Counter/Counter';

export const Ingredients: FC<IIngredientsProps> = ({ className, recipe, ...props }) => {

	const { ingridients, portions } = recipe;


	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className={styles.header}>
				<Title titleType='h2'>Ингридиенты</Title>
				<div className={styles.counter}>
					<span>Порции</span>
					<Counter startValue={portions} />
				</div>
			</div>
			<ul className={styles.list}>
				{ingridients.map(ingridient => (
					<li key={ingridient.name + ingridient.quantity.value} className={styles.item}><span>{ingridient.name}</span> <span className={styles.line}></span> <span>{ingridient.quantity.value} {ingridient.quantity.unit}.</span></li>
				))}
			</ul>
		</div>
	);
}