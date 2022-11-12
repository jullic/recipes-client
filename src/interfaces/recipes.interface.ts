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

export interface IIngredient {
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

export interface IRecipe {
	_id: string;
	name: string;
	author: string;
	img: string;
	time: ITime;
	kcal: number;
	ingridients: IIngredient[];
	portions: number;
	steps: IStep[];
	__v: number;
	users: IUser[];
}