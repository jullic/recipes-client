import React, { FC } from 'react';
import classNames from 'classnames';
import { IFavoritesProps } from './Favorites.props';
import styles from './Favorites.module.css';
import { Title } from '../../components/Title/Title';
import { Recipes } from '../../components/Recipes/Recipes';
import { withAdditionalMenu } from '../../hocs/withAdditionalMenu';

const Favorites: FC<IFavoritesProps> = ({ className, ...props }) => {

	const recipes: any[] = [];

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className="container">
				<Title className={styles.title}>Любимые рецепты</Title>
				<Recipes recipes={recipes} />
			</div>
		</div>
	);
}

export const FavoritesPage = withAdditionalMenu(Favorites);