import React, { FC, MouseEvent } from 'react';
import classNames from 'classnames';
import { IRecipeHeaderProps } from './RecipeHeader.props';
import styles from './RecipeHeader.module.css';
import { Button } from '../Button/Button';
import { Title } from '../Title/Title';
import { Text } from '../Text/Text';

import * as BookmarkIcon from '../../assets/img/bookmark.svg';
import * as ClockIcon from '../../assets/img/clock-black.svg';
import * as KcalkIcon from '../../assets/img/kcal.svg';
import * as GridIcon from '../../assets/img/grid.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { useNavigate } from 'react-router-dom';
import { fetchAddToFavorite, fetchRemoveFromFavorite } from '../../redux/slices/recipes.slice';


export const RecipeHeader: FC<IRecipeHeaderProps> = ({ className, recipe, ...props }) => {
	const { img, users, ingridients, kcal, time, name, isFavorite, _id } = recipe;

	const userName = users ? `${users[0].name} ${users[0].lastName}` : 'Anonim'
	const recipeTime = time ? `${time.value} ${time.unit ? time.unit : 'мин'}` : '10 мин';

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

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className={classNames(styles.img)}>
				<img src={img} alt="" />
				<Button disabled={recipeStatus === 'loading'} onClick={onClickHandler} className={classNames(styles.btn, { [styles.active]: isFavorite })} color='primary' btnType='icon'><BookmarkIcon.ReactComponent /></Button>
			</div>
			<div className={styles.info}>
				<Title>{name}</Title>
				<Text>{userName}</Text>
				<div className={styles.items}>
					<div className={styles.item}>
						<ClockIcon.ReactComponent />
						<span>{recipeTime}</span>
					</div>
					<div className={styles.item}>
						<KcalkIcon.ReactComponent />
						<span>{kcal} ккал</span>
					</div>
					<div className={styles.item}>
						<GridIcon.ReactComponent />
						<span>{ingridients.length} ингридиентов</span>
					</div>
				</div>
			</div>

		</div>
	);
}