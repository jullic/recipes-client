import React, { FC } from 'react';
import classNames from 'classnames';
import { IAuthFormProps } from './AuthForm.props';
import styles from './AuthForm.module.css';
import { Button } from '../Button/Button';

export const AuthForm: FC<IAuthFormProps> = ({ className, ...props }) => {

	return (
		<form onSubmit={e => e.preventDefault()} className={classNames(styles.root, className)} {...props}>
			<div className={styles.inputs}>
				<input type="email" placeholder='Введите Ваш email' />
				<input type="text" placeholder='Введите Ваш пароль' />
			</div>
			<Button color='black'>Войти</Button>
		</form>
	);
}