import React, { FC } from 'react';
import classNames from 'classnames';
import { ICreateIngridientProps } from './CreateIngridient.props';
import styles from './CreateIngridient.module.css';
import { Button } from '../Button/Button';

export const CreateIngridient: FC<ICreateIngridientProps> = ({ className, ...props }) => {

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<input className={styles.ingr} type="text" placeholder='Ингридиент' />
			<div className={styles.wrapp}>
				<div className={styles.wrapper}>
					<div className={styles.wrap}>
						<span>кол-во</span>
						<input className={styles.val} type="number" min={1} />
					</div>
					<div className={styles.wrap}>
						<span>ед. изм.</span>
						<select className={styles.select} >
							<option value="л">л</option>
							<option value="мл">мл</option>
							<option value="гр">гр</option>
							<option value="кг">кг</option>
							<option value="шт">шт</option>
							<option value="ложка">ложка</option>
							<option value="стакан">стакан</option>
						</select>
					</div>
				</div>
				<Button className={styles.del}>-</Button>
			</div>
		</div>
	);
}