import React, { FC, useEffect } from 'react';
import classNames from 'classnames';
import { IRecipeProps } from './Recipe.props';
import styles from './Recipe.module.css';
import { withAdditionalMenu } from '../../hocs/withAdditionalMenu';
import { RecipeHeader } from '../../components/RecipeHeader/RecipeHeader';
import { Ingredients } from '../../components/Ingredients/Ingredients';
import { Step } from '../../components/Step/Step';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { fetchOneRecipes } from '../../redux/slices/recipes.slice';

const Recipe: FC<IRecipeProps> = ({ className, ...props }) => {

	const { id } = useParams();
	const { recipe } = useAppSelector(state => state.recipes);
	const dispatch = useAppDispatch();

	useEffect(() => {
		window.scrollTo(0, 0);
		if (id) {
			dispatch(fetchOneRecipes({ id }));
		}
	}, []);

	if (!recipe || recipe._id !== id) {
		return <div className='container'>null</div>
	}


	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className="container">
				<div className={styles.content}>
					<RecipeHeader recipe={recipe} />
					<Ingredients recipe={recipe} />
					<div className={styles.steps}>
						<Step recipe={recipe} />
					</div>
				</div>
			</div>
		</div>
	);
}

export const RecipePage = withAdditionalMenu(Recipe);