import React, { FC } from 'react';
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


export const RecipeHeader: FC<IRecipeHeaderProps> = ({ className, recipe, ...props }) => {
	const { img, users, ingridients, kcal, time, name } = recipe;

	console.log(recipe);


	const userName = users ? `${users[0].name} ${users[0].lastName}` : 'Anonim'
	const recipeTime = time ? `${time.value} ${time.unit ? time.unit : 'мин'}` : '10 мин';

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className={classNames(styles.img)}>
				<img src={img} alt="" />
				<Button className={styles.btn} color='primary' btnType='icon'><BookmarkIcon.ReactComponent /></Button>
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