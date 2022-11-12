import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { IHeaderProps } from './Header.props';
import styles from './Header.module.css';
import { Logo } from '../../components/Logo/Logo';
import { Button } from '../../components/Button/Button';
import { Link, useLocation } from 'react-router-dom';

import * as SearchIcon from '../../assets/img/search.svg';
import * as BookmarkIcon from '../../assets/img/bookmark.svg';
import * as BookOpenIcon from '../../assets/img/bookOpen.svg';
import * as UserIcon from '../../assets/img/user.svg';
import * as LoginIcon from '../../assets/img/login.svg';
import { SearchInput } from '../../components/SearchInput/SearchInput';
import { useAppSelector } from '../../hooks/redux.hooks';

export const Header: FC<IHeaderProps> = ({ className, ...props }) => {
	const { pathname } = useLocation();
	const [isSearch, setIsSearch] = useState(false);

	const { access_token } = useAppSelector(state => state.auth);

	const onSetSearchHandler = () => {
		setIsSearch(prev => !prev);
	}

	console.log(access_token);


	return (
		<header className={classNames(styles.root, className)} {...props}>
			<div className="container">
				<div className={styles.content}>
					<Link className={styles.logo} to={'/'}><Logo isMobale={false} /></Link>
					<div className={styles.btns}>
						<Button onClick={onSetSearchHandler} className={classNames(styles.btn, { [styles.active]: isSearch })} btnType='icon'><SearchIcon.ReactComponent /></Button>
						<Link to={'/favorites'}><Button className={classNames(styles.button, {
							[styles.active]: pathname.match(/\/favorites/)
						})} btnType='icon'><BookmarkIcon.ReactComponent /></Button></Link>
						<Link to={'/my'}><Button className={classNames(styles.button, {
							[styles.active]: pathname.match(/\/my/)
						})} btnType='icon'><BookOpenIcon.ReactComponent /></Button></Link>
						{
							access_token ?
								<Link to={'/profile'}><Button className={classNames(styles.button, {
									[styles.active]: pathname.match(/\/profile/)
								})} btnType='icon'><UserIcon.ReactComponent /></Button></Link>
								:
								<Link to={'/login'}><Button className={classNames(styles.button, {
									[styles.active]: pathname.match(/login|register/)
								})} btnType='icon'><LoginIcon.ReactComponent /></Button></Link>
						}

					</div>
				</div>
			</div>
			{<SearchInput className={classNames(styles.input, { [styles.active]: isSearch, [styles.unmount]: !isSearch })} />}
		</header>
	);
}