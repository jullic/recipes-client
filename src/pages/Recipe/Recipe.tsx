import React, { FC, useEffect } from 'react';
import classNames from 'classnames';
import { IRecipeProps } from './Recipe.props';
import styles from './Recipe.module.css';
import { withAdditionalMenu } from '../../hocs/withAdditionalMenu';
import { RecipeHeader } from '../../components/RecipeHeader/RecipeHeader';
import { Ingredients } from '../../components/Ingredients/Ingredients';
import { Step } from '../../components/Step/Step';
import { useParams } from 'react-router-dom';

const Recipe: FC<IRecipeProps> = ({ className, ...props }) => {

	const { id } = useParams();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);


	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className="container">
				<div className={styles.content}>
					<RecipeHeader />
					<Ingredients />
					<div className={styles.steps}>
						<Step />
					</div>
				</div>
			</div>
		</div>
	);
}

export const RecipePage = withAdditionalMenu(Recipe);