import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {
	AnyAction,
	applyMiddleware,
	combineReducers,
	legacy_createStore as createStore,
} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';

import {AppActionsType, appReducer} from './app-reducer';
import {
	CategoriesActionsType,
	categoriesReducer
} from '../features/categories/categories-reducer';

const rootReducer = combineReducers({
	app: appReducer,
	categories: categoriesReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

type AppDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
	AppRootStateType,
	unknown,
	RootActionsType // AppRootActionsType
	>;
type RootActionsType = | AppActionsType
	| CategoriesActionsType

export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.state = store.getState();
