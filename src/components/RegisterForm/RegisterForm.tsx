import React, { FC } from 'react';
import classNames from 'classnames';
import { IRegisterFormProps } from './RegisterForm.props';
import styles from './RegisterForm.module.css';
import { Button } from '../Button/Button';

export const RegisterForm: FC<IRegisterFormProps> = ({ className, ...props }) => {

	return (
		<form className={classNames(styles.root, className)} {...props}>
			<div className={styles.inputs}>
				<input type="text" placeholder='Введите Ваше имя' />
				<input type="text" placeholder='Введите Вашу фамилию' />
				<input className={styles.data} type="email" placeholder='Введите Ваш email' />
				<input type="password" placeholder='Введите пароль' />
				<input type="password" placeholder='Подтвердите пароль' />
			</div>
			<Button color='black'>Зарегистрироваться</Button>
		</form>
	);
}