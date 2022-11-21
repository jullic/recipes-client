import React, { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react';
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
import { IBaseRecipe, IIngridient, IStep } from '../../interfaces/recipes.interface';
import { nanoid } from '@reduxjs/toolkit';


export const Create: FC<ICreateProps> = ({ className, ...props }) => {

	const fileInputRef = useRef<HTMLInputElement>(null);

	const [imgLink, setImgLink] = useState<null | string>(null);
	const [title, setTitle] = useState('');
	const [portions, setPortions] = useState(2);
	const [kcal, setKcal] = useState<number>(0);
	const [time, setTime] = useState<number>(0);
	const [ingridients, setIngridients] = useState<(IIngridient & { id: string })[]>([
		{ id: nanoid(10), name: '', quantity: { unit: 'л', value: 0 } },
	]);
	const [steps, setSteps] = useState<(IStep & { id: string })[]>([
		{ id: nanoid(10), description: '', title: '' },
	]);

	const { access_token } = useAppSelector(state => state.auth);
	const navigate = useNavigate();

	const onUpdatePortinos = (operator: '+' | '-') => {
		setPortions(prev => operator === '+' ? prev + 1 : prev - 1);
	}

	const onUpdateIngridient = useCallback((id: string, updatedIngridient: IIngridient & { id: string }) => {
		setIngridients(prev => {
			const arr = prev.map(ingridient => {
				if (ingridient.id === id) {
					return updatedIngridient;
				}
				return ingridient;
			})
			return [...arr];
		});
	}, []);

	const onDeleteIngridient = useCallback((id: string) => {
		setIngridients(prev => {
			const index = prev.findIndex(ingridient => ingridient.id === id);
			const newArr = [...prev];
			newArr.splice(index, 1);
			return newArr;
		});
	}, []);

	const onAddNewIngridient = () => {
		setIngridients(prev => [...prev, { id: nanoid(10), name: '', quantity: { unit: 'л', value: 0 } }]);
	}

	const onAddNewStep = () => {
		setSteps(prev => [...prev, { id: nanoid(10), description: '', title: '' }]);
	}

	const onUpdateStep = useCallback((id: string, updatedStep: IStep & { id: string }) => {
		setSteps(prev => {
			const arr = prev.map(step => {
				if (step.id === id) {
					return updatedStep;
				}
				return step;
			})
			return [...arr];
		});
	}, []);

	const onDeleteStep = useCallback((id: string) => {
		setSteps(prev => {
			const index = prev.findIndex(step => step.id === id);
			const newArr = [...prev];
			newArr.splice(index, 1);
			return newArr;
		});
	}, []);


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
			console.log(e);
		}
	};

	useEffect(() => {
		if (!access_token) {
			navigate('/login');
		}
	}, []);

	const onPublish = async () => {
		const data: Omit<IBaseRecipe, '_id' | 'author' | '__v'> = {
			name: title,
			img: imgLink ?? '',
			time: { unit: 'мин', value: time },
			kcal,
			ingridients: ingridients.map(ingr => {
				const { id, ...data } = ingr;
				return data;
			}),
			portions,
			steps: steps.map(step => {
				const { id, ...data } = step;
				return data;
			}),
		}
		const recipe = await axios.post('/recipes', data);
		return navigate('/my');
	};

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className="container">
				<div className={styles.content}>
					<input onChange={e => setTitle(e.target.value)} className={styles.title} type="text" placeholder='Название рецепта' value={title} />
					<div onClick={onClickInput} className={styles.img}>
						<img src={imgLink || Photo} alt="" />
						<input onChange={onChangeImg} ref={fileInputRef} name='image' type="file" accept='image/*' hidden />
					</div>
					<div className={styles.info}>
						<div className={styles.conuter}>
							<span>Кол-во порций:</span>
							<Counter startValue={portions} onUpdateValue={onUpdatePortinos} />
						</div>
						<div className={styles.item}>
							<span>Калорийность:</span>
							<input className={styles.input} type="number" min={1} placeholder='100' value={kcal === 0 ? '' : kcal} onChange={e => setKcal(Number(e.target.value))} />
						</div>
						<div className={styles.item}>
							<span>Время приголовления (мин):</span>
							<input className={styles.input} type="number" min={1} placeholder='100' value={time === 0 ? '' : time} onChange={e => setTime(Number(e.target.value))} />
						</div>
					</div>
					<div className={styles.main}>
						<div className={styles.ingridients}>
							<div className={styles.header}>
								<Title>Ингридиенты</Title>
								<Button onClick={onAddNewIngridient} className={styles.plus}>+</Button>
							</div>
							{ingridients.map((ingridient) =>
								<CreateIngridient
									className={styles.ingr}
									key={ingridient.id}
									startIngridient={ingridient}
									updateIngridient={onUpdateIngridient}
									onDeleteIngridient={onDeleteIngridient}
									canDelete={ingridients.length > 1}
								/>)}
							{/* <CreateIngridient /> */}
						</div>
						<div className={styles.steps}>
							<div className={styles.header}>
								<Title>Шаги</Title>
								<Button onClick={onAddNewStep} className={styles.plus}>+</Button>
							</div>
							{steps.map((step) =>
								<CreateStep
									key={step.id}
									className={styles.step}
									startStep={step}
									onUpdateStep={onUpdateStep}
									onDeleteStep={onDeleteStep}
									canDelete={steps.length > 1}
								/>
							)}
							{/* <CreateStep /> */}
						</div>
					</div>
					<Button onClick={onPublish} className={styles.publish}>Опубликовать</Button>
				</div>
			</div>
		</div>
	);
}