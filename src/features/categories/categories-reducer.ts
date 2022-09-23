import {AppThunk} from '../../app/store';
import {categoriesApi} from './categories-api';

const initialState: InitialStateType = {
	categories: [],
	category: {} as FullCategoryType
};

export const categoriesReducer = (
	state: InitialStateType = initialState,
	action: CategoriesActionsType,
): InitialStateType => {
	switch (action.type) {
		case 'CATEGORIES/SET-CATEGORIES':
			return {
				...state, categories: [...action.categories]
			};
		case 'CATEGORIES/SET-CATEGORY-WORDS':
			return {
				...state,
				category: {...action.category}
			};
		default:
			return state;
	}
};

//______________actions______________

const setCategoriesAC = (categories: CategoryType[]) => {
	return {
		type: 'CATEGORIES/SET-CATEGORIES',
		categories
	} as const;
};

const setCategory = (category: FullCategoryType) => {
	return {
		type: 'CATEGORIES/SET-CATEGORY-WORDS',
		category
	} as const;
};

//______________thunks_________________

export const fetchCategories = (): AppThunk =>
	async dispatch => {
		const {data} = await categoriesApi.fetchCategories();
		try {
			const dataToState = data.map(el => ({id: el.id, name: el.name, deckImage: el.deckImage}));
			dispatch(setCategoriesAC(dataToState));
		} catch (e) {
			console.log(e);
		}
	};

export const fetchCategory = (id: number): AppThunk =>
	async dispatch => {
		const {data} = await categoriesApi.fetchWords(id);
		try {
			dispatch(setCategory(data))
		} catch (e) {
			console.log(e);
		}
	};

//______________types__________________

export type InitialStateType = {
	categories: CategoryType[],
	category: FullCategoryType,
}
export type ResponseType = FullCategoryType[];
export type WordType = {
	id: number;
	eng: string;
	rus: string;
	img: string;
	audio: string;
}
export type FullCategoryType = {
	id: number;
	name: string;
	deckImage: string;
	words: WordType[];
}
export type CategoryType = {
	id: number;
	name: string;
	deckImage: string;
}

export type CategoriesActionsType =
	| SetCategoriesAT
	| SetCategoryAT

type SetCategoriesAT = ReturnType<typeof setCategoriesAC>
type SetCategoryAT = ReturnType<typeof setCategory>