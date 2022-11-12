import React, { FC } from 'react';
import classNames from 'classnames';
import { IHomeProps } from './Home.props';
import styles from './Home.module.css';
import { Title } from '../../components/Title/Title';
import { withAdditionalMenu } from '../../hocs/withAdditionalMenu';
import { Recipes } from '../../components/Recipes/Recipes';

const Home: FC<IHomeProps> = ({ className, ...props }) => {

	const recipes: any[] = [];

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