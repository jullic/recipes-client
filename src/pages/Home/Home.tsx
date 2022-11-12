import React, { FC, useEffect } from 'react';
import classNames from 'classnames';
import { IHomeProps } from './Home.props';
import styles from './Home.module.css';
import { Title } from '../../components/Title/Title';
import { withAdditionalMenu } from '../../hocs/withAdditionalMenu';
import { Recipes } from '../../components/Recipes/Recipes';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { clearRecipes, fetchRecipes } from '../../redux/slices/recipes.slice';

const Home: FC<IHomeProps> = ({ className, ...props }) => {

	const { recipes } = useAppSelector(state => state.recipes);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchRecipes());

		return () => {
			dispatch(clearRecipes());
		}
	}, []);

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className="container">
				<Title className={styles.title}>Все рецепты</Title>
				<Recipes recipes={recipes} />
			</div>
		</div>
	);
}

export const HomePage = withAdditionalMenu(Home);