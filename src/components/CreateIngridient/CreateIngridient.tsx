import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { ICreateIngridientProps } from './CreateIngridient.props';
import styles from './CreateIngridient.module.css';
import { Button } from '../Button/Button';

export const CreateIngridient: FC<ICreateIngridientProps> = ({ className, startIngridient, updateIngridient, onDeleteIngridient, canDelete, ...props }) => {

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<input onChange={e => updateIngridient(startIngridient.id, { ...startIngridient, name: e.target.value })} className={styles.ingr} type="text" placeholder='Ингридиент' value={startIngridient.name} />
			<div className={styles.wrapp}>
				<div className={styles.wrapper}>
					<div className={styles.wrap}>
						<span>кол-во</span>
						<input onChange={e => updateIngridient(startIngridient.id, { ...startIngridient, quantity: { value: Number(e.target.value), unit: startIngridient.quantity.unit } })} className={styles.val} type="number" min={1} value={startIngridient.quantity.value === 0 ? '' : startIngridient.quantity.value} />
					</div>
					<div className={styles.wrap}>
						<span>ед. изм.</span>
						<select onChange={e => updateIngridient(startIngridient.id, { ...startIngridient, quantity: { unit: e.target.value, value: startIngridient.quantity.value } })} className={styles.select} value={startIngridient.quantity.unit} >
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
				{canDelete && <Button onClick={() => onDeleteIngridient(startIngridient.id)} className={styles.del}>-</Button>}
			</div>
		</div>
	);
}