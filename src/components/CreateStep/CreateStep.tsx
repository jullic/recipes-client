import React, { FC } from 'react';
import classNames from 'classnames';
import { ICreateStepProps } from './CreateStep.props';
import styles from './CreateStep.module.css';
import { Button } from '../Button/Button';

export const CreateStep: FC<ICreateStepProps> = ({ className, ...props }) => {

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className={styles.wrap}>
				<input className={styles.name} type="text" placeholder='Название' />
				<Button className={styles.del}>-</Button>
			</div>
			<textarea className={styles.text} name="" placeholder='Инструкция шага'></textarea>
		</div>
	);
}