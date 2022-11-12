import React, { FC, useEffect } from 'react';
import classNames from 'classnames';
import { IMyProps } from './My.props';
import styles from './My.module.css';
import { Title } from '../../components/Title/Title';
import { Recipes } from '../../components/Recipes/Recipes';
import { withAdditionalMenu } from '../../hocs/withAdditionalMenu';
import { Button } from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { clearRecipes, fetchMyRecipes } from '../../redux/slices/recipes.slice';

const My: FC<IMyProps> = ({ className, ...props }) => {

	const { recipes } = useAppSelector(state => state.recipes);
	const { access_token } = useAppSelector(state => state.auth);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!access_token) {
			navigate('/login');
		}
		else {
			dispatch(fetchMyRecipes());
		}

		return () => {
			dispatch(clearRecipes())
		}
	}, []);

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div className="container">
				<Link to={'/create'}><Button className={styles.create}>Создать</Button></Link>
				<Title className={styles.title}>Мои рецепты</Title>
				<Recipes recipes={recipes} />
			</div>
		</div>
	);
}

export const MyPage = withAdditionalMenu(My);