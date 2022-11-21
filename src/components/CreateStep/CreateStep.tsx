import React, { FC } from 'react';
import classNames from 'classnames';
import { ICreateStepProps } from './CreateStep.props';
import styles from './CreateStep.module.css';
import { Button } from '../Button/Button';

export const CreateStep: FC<ICreateStepProps> = ({ className, canDelete, onDeleteStep, onUpdateStep, startStep, ...props }) => {

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className={styles.wrap}>
				<input onChange={e => onUpdateStep(startStep.id, ({ ...startStep, title: e.target.value }))} className={styles.name} type="text" placeholder='Название' value={startStep.title} />
				{canDelete && <Button onClick={e => onDeleteStep(startStep.id)} className={styles.del}>-</Button>}
			</div>
			<textarea onChange={e => onUpdateStep(startStep.id, ({ ...startStep, description: e.target.value }))} className={styles.text} name="" placeholder='Инструкция шага' value={startStep.description}></textarea>
		</div>
	);
}