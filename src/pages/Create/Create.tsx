import React, { FC, useRef } from 'react';
import classNames from 'classnames';
import { ICreateProps } from './Create.props';
import styles from './Create.module.css';
import Photo from '../../assets/img/photo.jpg';
import { Counter } from '../../components/Counter/Counter';
import { CreateIngridient } from '../../components/CreateIngridient/CreateIngridient';
import { CreateStep } from '../../components/CreateStep/CreateStep';
import { Title } from '../../components/Title/Title';
import { Button } from '../../components/Button/Button';

export const Create: FC<ICreateProps> = ({ className, ...props }) => {

	const fileInputRef = useRef<HTMLInputElement>(null);

	const onChangeImg = () => {
		fileInputRef.current?.click();
	};

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className="container">
				<div className={styles.content}>
					<input className={styles.title} type="text" placeholder='Название рецепта' />
					<div onClick={onChangeImg} className={styles.img}>
						<img src={Photo} alt="" />
						<input ref={fileInputRef} type="file" accept='image/*' hidden />
					</div>
					<div className={styles.info}>
						<div className={styles.conuter}>
							<span>Кол-во порций:</span>
							<Counter />
						</div>
						<div className={styles.item}>
							<span>Калорийность:</span>
							<input className={styles.input} type="text" placeholder='100' />
						</div>
						<div className={styles.item}>
							<span>Время приголовления (мин):</span>
							<input className={styles.input} type="text" placeholder='100' />
						</div>
					</div>
					<div className={styles.main}>
						<div className={styles.ingridients}>
							<div className={styles.header}>
								<Title>Ингридиенты</Title>
								<Button className={styles.plus}>+</Button>
							</div>
							<CreateIngridient />
						</div>
						<div className={styles.steps}>
							<div className={styles.header}>
								<Title>Шаги</Title>
								<Button className={styles.plus}>+</Button>
							</div>
							<CreateStep />
						</div>
					</div>
					<Button className={styles.publish}>Опубликовать</Button>
				</div>
			</div>
		</div>
	);
}