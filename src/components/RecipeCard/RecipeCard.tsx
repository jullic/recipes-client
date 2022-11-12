import React, { FC, MouseEvent } from 'react';
import classNames from 'classnames';
import { IRecipeCardProps } from './RecipeCard.props';
import styles from './RecipeCard.module.css';
import { Title } from '../Title/Title';
import { Button } from '../Button/Button';

import * as BookmarkIcon from '../../assets/img/bookmark.svg';
import * as ClockIcon from '../../assets/img/clock.svg';
import { Link } from 'react-router-dom';

export const RecipeCard: FC<IRecipeCardProps> = ({ className, ...props }) => {

	const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
	}

	return (
		<Link className={styles.link} to={'/recipes/1'}>
			<div className={classNames(styles.root, className)} {...props}>
				<img className={styles.img} src={'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'} alt={''} />
				<div className={styles.wrapper}>
					<div className={styles.header}>
						<div className={styles.author}>Алкександр Львов</div>
						<Button onClick={onClickHandler} className={classNames(styles.btn)} btnType='icon' color='primary'><BookmarkIcon.ReactComponent /></Button>
					</div>
					<Title titleType='h3' className={styles.name}>Название рецепта</Title>
					<div className={styles.footer}>
						<div className={styles.time}>
							<ClockIcon.ReactComponent />
							<span>20 мин</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}