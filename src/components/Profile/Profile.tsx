import React, { FC } from 'react';
import classNames from 'classnames';
import { IProfileProps } from './Profile.props';
import styles from './Profile.module.css';
import { Text } from '../Text/Text';
import { Button } from '../Button/Button';

export const Profile: FC<IProfileProps> = ({ className, ...props }) => {

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className={styles.info}>
				<Text>Александр Львов</Text>
				<Text>iJullic@yandex.ru</Text>
			</div>
			<Button className={styles.btn} color='black'>Выйти</Button>
		</div>
	);
}