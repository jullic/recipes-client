import React, { FC } from 'react';
import classNames from 'classnames';
import { IMyProps } from './My.props';
import styles from './My.module.css';
import { Title } from '../../components/Title/Title';
import { Recipes } from '../../components/Recipes/Recipes';
import { withAdditionalMenu } from '../../hocs/withAdditionalMenu';
import { Button } from '../../components/Button/Button';
import { Link } from 'react-router-dom';

const My: FC<IMyProps> = ({ className, ...props }) => {

	const recipes: any[] = [];

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className="container">
				<Link to={'/create'}><Button className={styles.create}>Создать</Button></Link>
				<Title className={styles.title}>Мои рецепты</Title>
				<Recipes recipes={recipes} />
			</div>
		</div>
	);
}

export const MyPage = withAdditionalMenu(My);