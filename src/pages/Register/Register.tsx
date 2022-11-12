import React, { FC } from 'react';
import classNames from 'classnames';
import { IRegisterProps } from './Register.props';
import styles from './Register.module.css';
import { Button } from '../../components/Button/Button';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import { Link } from 'react-router-dom';

export const Register: FC<IRegisterProps> = ({ className, ...props }) => {

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className="container">
				<div className={styles.content}>
					<Link to={'/login'}><Button className={styles.btn} color='black'>Войти</Button></Link>
					<RegisterForm className={styles.form} />
				</div>
			</div>
		</div>
	);
}