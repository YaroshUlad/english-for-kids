import React, {useEffect} from 'react';

import styles from './Categories.module.css';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {fetchCategories} from './categories-reducer';
import {Category} from './category/Category';

export const Categories = () => {
	const dispatch = useAppDispatch();

	const categories = useAppSelector(state => state.categories.categories);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);
	return (
		<div className={styles.wrapper}>
			<div className={styles.block}>
				{categories && categories.map(el => {
					return <Category key={el.id} id={el.id} name={el.name} deckImage={el.deckImage}/>
				})}
			</div>
		</div>
	);
};

