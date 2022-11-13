export interface ITime {
	value: number;
	unit: string;
}

export interface IUser {
	_id: string;
	name: string;
	lastName: string;
	email: string;
	__v: number;
}

export interface IIngridient {
	name: string;
	quantity: {
		value: number;
		unit: string;
	}
}

export interface IStep {
	title: string;
	description: string;
}

export interface IIsFavorite {
	isFavorite: boolean;
}

export interface IBaseRecipe {
	_id: string;
	name: string;
	author: string;
	img: string;
	time: ITime;
	kcal: number;
	ingridients: IIngridient[];
	portions: number;
	steps: IStep[];
	__v: number;
}

export interface IRecipe extends IBaseRecipe {
	users: [IUser];
	isFavorite: boolean;
}

export interface IFavorite {
	_id: string;
	userId: string;
	recipeId: string;
	__v: number;
	favorites: [IBaseRecipe];
	users: [IUser];
}