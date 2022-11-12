import React, { FC } from 'react';
import classNames from 'classnames';
import { IPageLayoutProps } from './PageLayout.props';
import styles from './PageLayout.module.css';
import { Header } from '../Header/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer/Footer';

export const PageLayout: FC<IPageLayoutProps> = ({ ...props }) => {

	return (
		<div className={classNames(styles.root)} {...props}>
			<Header />
			<main className={styles.main}>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}