import React, { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { IHomeProps } from './Home.props';
import styles from './Home.module.css';
import { Title } from '../../components/Title/Title';
import { withAdditionalMenu } from '../../hocs/withAdditionalMenu';
import { Recipes } from '../../components/Recipes/Recipes';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { clearRecipes, fetchMaxPage, fetchRecipes } from '../../redux/slices/recipes.slice';
import { Button } from '../../components/Button/Button';
import { RecipeCardSkeleton } from '../../components/RecipeCard/RecipeCard.skeleton';

const Home: FC<IHomeProps> = ({ className, ...props }) => {

	const { recipes, maxPage, page, status } = useAppSelector(state => state.recipes);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchMaxPage());
		dispatch(fetchRecipes());
	}, []);

	useEffect(() => {
		return () => {
			dispatch(clearRecipes());
		}
	}, []);

	const onLoadHandler = () => {
		dispatch(fetchRecipes());
	};

	console.log(page, maxPage);


	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className="container">
				<Title className={styles.title}>Все рецепты</Title>
				<Recipes recipes={recipes} />
				{
					status === 'loading' &&
					<Recipes recipes={[]}>{[...new Array(6)].map((item, i) => <RecipeCardSkeleton key={i} />)}</Recipes>
				}
				{page < maxPage && <Button onClick={onLoadHandler} className={styles.btn}>Загрузить еще</Button>}
			</div>
		</div>
	);
}

export const HomePage = withAdditionalMenu(Home);