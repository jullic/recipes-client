import React, { FC, MouseEvent } from 'react';
import classNames from 'classnames';
import { IRecipeCardProps } from './RecipeCard.props';
import styles from './RecipeCard.module.css';
import { Title } from '../Title/Title';
import { Button } from '../Button/Button';

import * as BookmarkIcon from '../../assets/img/bookmark.svg';
import * as ClockIcon from '../../assets/img/clock.svg';
import { Link } from 'react-router-dom';

export const RecipeCard: FC<IRecipeCardProps> = ({ className, recipe, ...props }) => {
	const { _id, author, img, name, time, users } = recipe;

	const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
	}


	const userName = users ? `${users[0].name} ${users[0].lastName}` : 'Anonim'
	const recipeTime = time ? `${time.value} ${time.unit ? time.unit : 'мин'}` : '10 мин';

	return (
		<Link className={styles.link} to={'/recipes/' + _id}>
			<div className={classNames(styles.root, className)} {...props}>
				<img className={styles.img} src={img} alt={''} />
				<div className={styles.wrapper}>
					<div className={styles.header}>
						<div className={styles.author}>{userName}</div>
						<Button onClick={onClickHandler} className={classNames(styles.btn)} btnType='icon' color='primary'><BookmarkIcon.ReactComponent /></Button>
					</div>
					<Title titleType='h3' className={styles.name}>{name}</Title>
					<div className={styles.footer}>
						<div className={styles.time}>
							<ClockIcon.ReactComponent />
							<span>{recipeTime}</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}