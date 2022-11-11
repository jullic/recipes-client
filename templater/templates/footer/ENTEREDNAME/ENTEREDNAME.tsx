import React, { FC } from 'react';
import classNames from 'classnames';
import { IENTEREDNAMEProps } from './ENTEREDNAME.props';
import styles from './ENTEREDNAME.module.css';

export const ENTEREDNAME: FC<IENTEREDNAMEProps> = ({ className, ...props }) => {

	return (
		<footer className={classNames(styles.root, className)} {...props}>

		</footer>
	);
}