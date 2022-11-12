import React, { FC } from 'react';
import classNames from 'classnames';
import { ILoginProps } from './Login.props';
import styles from './Login.module.css';
import { Button } from '../../components/Button/Button';
import { AuthForm } from '../../components/AuthForm/AuthForm';
import { Link } from 'react-router-dom';

export const Login: FC<ILoginProps> = ({ className, ...props }) => {
	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className="container">
				<div className={styles.content}>
					<Link to={'/register'}><Button className={styles.btn} color='black'>Зарегистрироваться</Button></Link>
					<AuthForm className={styles.form} />
				</div>
			</div>
		</div>
	);
}
