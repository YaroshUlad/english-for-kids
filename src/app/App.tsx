import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from './store';
import {initAppAC} from './app-reducer';
import {Route, Routes} from 'react-router-dom';
import {Header} from '../common/header/Header';
import {Categories} from '../features/categories/Categories';
import {Cards} from '../features/cards/Cards';

function App() {
	const dispatch = useAppDispatch();
	const isInit = useAppSelector(state => state.app.isInit);

	useEffect(() => {
		dispatch(initAppAC()); // инициализация приложения после аутентификации
	}, [dispatch]);

	if ( !isInit) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<Header/>
			<Routes>
				<Route path={'/'} element={<Categories/>}/>
				<Route path={'/cards/*'} element={<Cards/>}/>
			</Routes>
		</div>
	);
}

export default App;
