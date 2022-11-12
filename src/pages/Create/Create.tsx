import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { ICreateProps } from './Create.props';
import styles from './Create.module.css';
import Photo from '../../assets/img/photo.jpg';
import { Counter } from '../../components/Counter/Counter';
import { CreateIngridient } from '../../components/CreateIngridient/CreateIngridient';
import { CreateStep } from '../../components/CreateStep/CreateStep';
import { Title } from '../../components/Title/Title';
import { Button } from '../../components/Button/Button';
import { axios } from '../../axios';
import { useAppSelector } from '../../hooks/redux.hooks';
import { useNavigate } from 'react-router-dom';

export const Create: FC<ICreateProps> = ({ className, ...props }) => {

	const fileInputRef = useRef<HTMLInputElement>(null);
	const [imgLink, setImgLink] = useState<null | string>(null);

	const { access_token } = useAppSelector(state => state.auth);
	const navigate = useNavigate();

	const onClickInput = () => {
		fileInputRef.current?.click();
	};

	const onChangeImg = async (e: ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.files);
		try {
			const formData = new FormData();
			if (e.target.files) {
				const file = e.target.files[0]
				formData.append('img', file);
				const { data } = await axios.post('/uploads', formData);
				console.log(data);
				setImgLink('http://localhost:3300/' + data.path);
			}
		} catch (e) {

		}
	};

	useEffect(() => {
		if (!access_token) {
			navigate('/');
		}
	}, []);


	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className="container">
				<div className={styles.content}>
					<input className={styles.title} type="text" placeholder='Название рецепта' />
					<div onClick={onClickInput} className={styles.img}>
						<img src={imgLink || Photo} alt="" />
						<input onChange={onChangeImg} ref={fileInputRef} name='image' type="file" accept='image/*' hidden />
					</div>
					<div className={styles.info}>
						<div className={styles.conuter}>
							<span>Кол-во порций:</span>
							<Counter startValue={1} />
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