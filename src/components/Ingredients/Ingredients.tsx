import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { IIngredientsProps } from './Ingredients.props';
import styles from './Ingredients.module.css';
import { Title } from '../Title/Title';
import { Counter } from '../Counter/Counter';

export const Ingredients: FC<IIngredientsProps> = ({ className, recipe, ...props }) => {

	const { ingridients, portions } = recipe;
	const [value, setValue] = useState(portions);

	const onUpdatePortinos = (operator: '+' | '-') => {
		setValue(prev => operator === '+' ? prev + 1 : prev - 1);
	}

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className={styles.header}>
				<Title titleType='h2'>Ингридиенты</Title>
				<div className={styles.counter}>
					<span>Порции</span>
					<Counter startValue={value} onUpdateValue={onUpdatePortinos} />
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