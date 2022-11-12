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


export const RecipeHeader: FC<IRecipeHeaderProps> = ({ className, ...props }) => {

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className={classNames(styles.img)}>
				<img src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80" alt="" />
				<Button className={styles.btn} color='primary' btnType='icon'><BookmarkIcon.ReactComponent /></Button>
			</div>
			<div className={styles.info}>
				<Title>Название рецепта</Title>
				<Text>Алкександр Львов</Text>
				<div className={styles.items}>
					<div className={styles.item}>
						<ClockIcon.ReactComponent />
						<span>20 мин</span>
					</div>
					<div className={styles.item}>
						<KcalkIcon.ReactComponent />
						<span>200 ккал</span>
					</div>
					<div className={styles.item}>
						<GridIcon.ReactComponent />
						<span>10 ингридиентов</span>
					</div>
				</div>
			</div>

		</div>
	);
}