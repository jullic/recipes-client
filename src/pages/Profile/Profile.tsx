import React, { FC, useEffect } from 'react';
import classNames from 'classnames';
import { IProfileProps } from './Profile.props';
import styles from './Profile.module.css';
import { Profile as ProfileComponent } from '../../components/Profile/Profile';
import { withAdditionalMenu } from '../../hocs/withAdditionalMenu';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { fetchUser } from '../../redux/slices/auth.slice';
import { useNavigate } from 'react-router-dom';

const Profile: FC<IProfileProps> = ({ className, ...props }) => {

	const { user, access_token } = useAppSelector(state => state.auth);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!access_token) {
			navigate('/login');
		}
		else {
			dispatch(fetchUser());
		}
	}, []);

	if (!user) {
		return <>Loading</>;
	}

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className="container">
				<ProfileComponent user={user} />
			</div>
		</div>
	);
}

export const ProfilePage = withAdditionalMenu(Profile);