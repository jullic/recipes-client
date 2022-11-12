import React, { FC } from 'react';
import classNames from 'classnames';
import { IRecipesProps } from './Recipes.props';
import styles from './Recipes.module.css';
import { RecipeCard } from '../RecipeCard/RecipeCard';

export const Recipes: FC<IRecipesProps> = ({ className, recipes, ...props }) => {
	return (
		<div className={classNames(styles.root, className)} {...props}>
			{recipes.map(recipe => <RecipeCard key={recipe._id} recipe={recipe} />)}
		</div>
	);
}