import React, { FC, useRef } from 'react';
import classNames from 'classnames';
import { IRegisterFormProps } from './RegisterForm.props';
import styles from './RegisterForm.module.css';
import { Button } from '../Button/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { fetchRegister } from '../../redux/slices/auth.slice';

interface IInputs {
	name: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export const RegisterForm: FC<IRegisterFormProps> = ({ className, ...props }) => {

	const { register, handleSubmit, formState: { errors, isValid, }, watch } = useForm<IInputs>({ mode: 'onBlur' });
	const { status } = useAppSelector(state => state.auth);
	const passwordRef = useRef({});
	passwordRef.current = watch("password", "");
	const dispatch = useAppDispatch();
	const navigate = useNavigate();


	const onSubmit: SubmitHandler<IInputs> = async (e) => {
		const test = await dispatch(fetchRegister(e));
		if (test.payload) {
			return navigate('/');
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={classNames(styles.root, className)} {...props}>
			{status === 'error' && <span className={styles.titleError}>Ошибка регистрации</span>}
			<div className={styles.inputs}>
				<div className={styles.wrap}>
					<input type="text" placeholder='Введите Ваше имя' {...register('name', {
						required: 'Обязательное поле',
						minLength: {
							value: 2,
							message: 'Минимум 2 символa'
						}
					})} />
					{errors.name ? <span className={styles.error}>{errors.name.message}</span> : null}
				</div>
				<div className={styles.wrap}>
					<input type="text" placeholder='Введите Вашу фамилию' {...register('lastName', {
						required: 'Обязательное поле',
						minLength: {
							value: 2,
							message: 'Минимум 2 символa'
						}
					})} />
					{errors.lastName ? <span className={styles.error}>{errors.lastName.message}</span> : null}
				</div>
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
					<input type="password" placeholder='Введите Ваш пароль' {...register('password', {
						required: 'Обязательное поле',
						minLength: {
							value: 6,
							message: 'Минимум 6 символов'
						}
					})} />
					{errors.password ? <span className={styles.error}>{errors.password.message}</span> : null}
				</div>
				<div className={styles.wrap}>
					<input
						type="password"
						placeholder='Подтвердите пароль'
						{...register("confirmPassword", {
							validate: (value) => {
								console.log('value + ' + value, 'current + ' + passwordRef.current);
								return value === passwordRef.current || "Пароли не совпадают";
							}
						})}
					/>
					{errors.confirmPassword ? <span className={styles.error}>{errors.confirmPassword.message}</span> : null}
				</div>
			</div>
			<Button disabled={!isValid} color='black'>Зарегистрироваться</Button>
		</form>
	);

}