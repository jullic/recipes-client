import classNames from 'classnames';
import { FC } from 'react';
import styles from './RecipeCard.module.css';

export const RecipeCardSkeleton: FC = () => {

	return (
		<div className={classNames(styles.root, styles.skeleton)}>
		</div>
	)
}