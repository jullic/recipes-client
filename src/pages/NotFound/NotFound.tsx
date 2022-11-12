import React, { FC } from 'react';
import classNames from 'classnames';
import { INotFoundProps } from './NotFound.props';
import styles from './NotFound.module.css';
import { Title } from '../../components/Title/Title';
import { withAdditionalMenu } from '../../hocs/withAdditionalMenu';

const NotFound: FC<INotFoundProps> = ({ className, ...props }) => {

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className="container">
				<Title>Ничего не найдено | 404</Title>
			</div>
		</div>
	);
}

export const NotFoundPage = withAdditionalMenu(NotFound);