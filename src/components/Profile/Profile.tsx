import React, { FC } from 'react';
import classNames from 'classnames';
import { IProfileProps } from './Profile.props';
import styles from './Profile.module.css';
import { Text } from '../Text/Text';
import { Button } from '../Button/Button';
import { useAppDispatch } from '../../hooks/redux.hooks';
import { logout } from '../../redux/slices/auth.slice';
import { useNavigate } from 'react-router-dom';

export const Profile: FC<IProfileProps> = ({ className, user, ...props }) => {

	const name = `${user.name} ${user.lastName}`;
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onLogout = () => {
		if (window.confirm('Вы точно хотите выйти?')) {
			dispatch(logout());
			navigate('/login');
		}
	};

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className={styles.info}>
				<Text>{name}</Text>
				<Text>{user.email}</Text>
			</div>
			<Button onClick={onLogout} className={styles.btn} color='black'>Выйти</Button>
		</div>
	);
}