import React, { FC } from 'react';
import classNames from 'classnames';
import { IAuthFormProps } from './AuthForm.props';
import styles from './AuthForm.module.css';
import { Button } from '../Button/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/redux.hooks';
import { fetchAuth } from '../../redux/slices/auth.slice';
import { useNavigate } from 'react-router-dom';

interface IInputs {
	email: string;
	password: string;
}

export const AuthForm: FC<IAuthFormProps> = ({ className, ...props }) => {

	const { register, handleSubmit, formState: { errors, isValid } } = useForm<IInputs>({ mode: 'onBlur' });
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<IInputs> = async (e) => {
		const test = await dispatch(fetchAuth(e));
		if (test.payload) {
			return navigate('/');
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={classNames(styles.root, className)} {...props}>
			<div className={styles.inputs}>
				<div className={styles.wrap}>
					<input type="email" placeholder='Введите Ваш email' {...register('email', {
						required: 'Обязательное поле',
						minLength: {
							value: 5,
							message: 'Минимум 5 символов'
						}
					})} />
					{errors.email ? <span className={styles.error}>{errors.email.message}</span> : null}
				</div>
				<div className={styles.wrap}>
					<input type="text" placeholder='Введите Ваш пароль' {...register('password', {
						required: 'Обязательное поле',
						minLength: {
							value: 6,
							message: 'Минимум 6 символов'
						}
					})} />
					{errors.password ? <span className={styles.error}>{errors.password.message}</span> : null}
				</div>
			</div>
			<Button disabled={!isValid} color='black'>Войти</Button>
		</form>
	);
}