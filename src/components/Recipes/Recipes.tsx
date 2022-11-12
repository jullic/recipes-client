import React, { FC } from 'react';
import classNames from 'classnames';
import { IRecipesProps } from './Recipes.props';
import styles from './Recipes.module.css';
import { RecipeCard } from '../RecipeCard/RecipeCard';

export const Recipes: FC<IRecipesProps> = ({ className, ...props }) => {
	return (
		<div className={classNames(styles.root, className)} {...props}>
			<RecipeCard />
		</div>
	);
}