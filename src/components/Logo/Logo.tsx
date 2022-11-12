import React, { FC } from 'react';
import classNames from 'classnames';
import { ILogoProps } from './Logo.props';
import styles from './Logo.module.css';
import * as LogoIcon from '../../assets/img/logo.svg';

export const Logo: FC<ILogoProps> = ({ className, isMobale = false, ...props }) => {

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<LogoIcon.ReactComponent />
			{!isMobale && <span className={styles.text}>MyCook</span>}
		</div>
	);
}