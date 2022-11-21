import React, { FC, MouseEvent } from 'react';
import classNames from 'classnames';
import { IRecipeCardProps } from './RecipeCard.props';
import styles from './RecipeCard.module.css';
import { Title } from '../Title/Title';
import { Button } from '../Button/Button';

import * as BookmarkIcon from '../../assets/img/bookmark.svg';
import * as ClockIcon from '../../assets/img/clock.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { fetchAddToFavorite, fetchRemoveFromFavorite } from '../../redux/slices/recipes.slice';

export const RecipeCard: FC<IRecipeCardProps> = ({ className, recipe, ...props }) => {
	const { _id, img, name, time, users, isFavorite } = recipe;

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { access_token } = useAppSelector(state => state.auth);
	const { recipeStatus } = useAppSelector(state => state.recipes);

	const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!access_token) {
			return navigate('/login');
		}
		if (!isFavorite) {
			dispatch(fetchAddToFavorite({ recipeId: _id }));
		}
		else {
			dispatch(fetchRemoveFromFavorite({ recipeId: _id }));
		}
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
						<Button disabled={recipeStatus === 'loading'} onClick={onClickHandler} className={classNames(styles.btn, { [styles.active]: isFavorite })} btnType='icon' color='primary'><BookmarkIcon.ReactComponent /></Button>
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