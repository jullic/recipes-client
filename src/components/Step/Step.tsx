import React, { FC } from 'react';
import classNames from 'classnames';
import { IStepProps } from './Step.props';
import styles from './Step.module.css';
import { Title } from '../Title/Title';
import { Text } from '../Text/Text';

export const Step: FC<IStepProps> = ({ className, ...props }) => {

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<Title titleType='h2'>Шаг 1 – Название</Title>
			<Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictum id et viverra dignissim aliquam. Velit risus tortor arcu egestas. Orci enim ultrices quis faucibus orci, suspendisse. Tincidunt mi ut ac molestie ultrices nunc. Blandit posuere in neque, eu. Vitae mattis sed hendrerit nisi natoque at nulla id. Nisl felis orci nec risus amet proin.</Text>
		</div>
	);
}