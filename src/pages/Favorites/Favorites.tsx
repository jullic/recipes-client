import React, { FC, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { IFavoritesProps } from './Favorites.props';
import styles from './Favorites.module.css';
import { Title } from '../../components/Title/Title';
import { Recipes } from '../../components/Recipes/Recipes';
import { withAdditionalMenu } from '../../hocs/withAdditionalMenu';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { clearRecipes, fetchFavoriteRecipes } from '../../redux/slices/recipes.slice';
import { useNavigate } from 'react-router-dom';

const Favorites: FC<IFavoritesProps> = ({ className, ...props }) => {

	const { recipes } = useAppSelector(state => state.recipes);
	const { access_token } = useAppSelector(state => state.auth);
	const recipesRef = useRef<HTMLDivElement>(null);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!access_token) {
			navigate('/login');
		}
		else {
			dispatch(fetchFavoriteRecipes());
		}
		return () => {
			dispatch(clearRecipes())
		}
	}, []);

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