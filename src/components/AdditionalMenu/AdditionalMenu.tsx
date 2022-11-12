import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { IAdditionalMenuProps } from './AdditionalMenu.props';
import styles from './AdditionalMenu.module.css';
import { Button } from '../Button/Button';

import * as BoxIcon from '../../assets/img/box.svg';
import * as EditIcon from '../../assets/img/edit.svg';
import * as PlusIcon from '../../assets/img/plus.svg';

export const AdditionalMenu: FC<IAdditionalMenuProps> = ({ className, ...props }) => {

	const [isOpen, setIsOpen] = useState(false);

	const onClick = () => {
		setIsOpen(prev => !prev);
	}

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className={classNames(styles.wrapper, { [styles.active]: isOpen })}>
				<Button className={styles.circle} btnType='icon' color='white'><BoxIcon.ReactComponent /></Button>
				<Button className={styles.circle} btnType='icon' color='white'><EditIcon.ReactComponent /></Button>
				<Button onClick={onClick} className={styles.circle} btnType='icon' color='white'><PlusIcon.ReactComponent /></Button>
			</div>
		</div>
	);
}