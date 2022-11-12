import React, { FC } from 'react';
import classNames from 'classnames';
import { IFooterProps } from './Footer.props';
import styles from './Footer.module.css';

import * as EmailIcon from '../../assets/img/mail.svg';
import * as PhoneIcon from '../../assets/img/phone.svg';
import * as TelegramIcon from '../../assets/img/telegram.svg';
import * as VkIcon from '../../assets/img/vk.svg';

export const Footer: FC<IFooterProps> = ({ className, ...props }) => {

	return (
		<footer className={classNames(styles.root, className)} {...props}>
			<div className="container">
				<div className={styles.content}>
					<div className={styles.name}>
						Jullic
					</div>
					<div className={styles.contacts}>
						<div className={styles.contact}>
							<EmailIcon.ReactComponent />
							<a href="mailto:iJullic@yandex.ru">iJullic@yandex.ru</a>
						</div>
						<div className={styles.contact}>
							<PhoneIcon.ReactComponent />
							<a href="tel:+79116175902">+7 (911) 617-59-02</a>
						</div>
					</div>
					<div className={styles.socials}>
						<a href="!#"><TelegramIcon.ReactComponent /></a>
						<a href="!#"><VkIcon.ReactComponent /></a>
					</div>
				</div>
			</div>
		</footer>
	);
}