import React, { FC } from 'react';
import classNames from 'classnames';
import { IProfileProps } from './Profile.props';
import styles from './Profile.module.css';
import { Profile as ProfileComponent } from '../../components/Profile/Profile';
import { withAdditionalMenu } from '../../hocs/withAdditionalMenu';

const Profile: FC<IProfileProps> = ({ className, ...props }) => {

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className="container">
				<ProfileComponent />
			</div>
		</div>
	);
}

export const ProfilePage = withAdditionalMenu(Profile);