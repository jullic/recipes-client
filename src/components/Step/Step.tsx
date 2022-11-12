import React, { FC } from 'react';
import classNames from 'classnames';
import { IStepProps } from './Step.props';
import styles from './Step.module.css';
import { Title } from '../Title/Title';
import { Text } from '../Text/Text';

export const Step: FC<IStepProps> = ({ className, recipe, ...props }) => {
	const { steps } = recipe;

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className={styles.wrapper}>
				{steps.map(step => {
					return (
						<div key={step.title} className={styles.step}>
							<Title titleType='h2'>{step.title}</Title>
							<Text>{step.description}</Text>
						</div>
					);
				})}
			</div>
		</div>
	);
}