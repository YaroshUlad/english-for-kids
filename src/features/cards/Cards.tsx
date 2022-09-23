import React, {useEffect} from 'react';

import styles from './Cards.module.css';

import {useAppDispatch, useAppSelector} from '../../app/store';
import {fetchCategory} from '../categories/categories-reducer';
import {useLocation} from 'react-router-dom';
import {TrainCard} from './trainCard/TrainCard';
import {Play} from './play/Play';
import {setIsPlay} from '../../app/app-reducer';

export const Cards = () => {
	const url = useLocation();
	const id = url.pathname.split('/')[2];

	const dispatch = useAppDispatch();

	const isPlay = useAppSelector(state => state.app.isPlay);
	const words = useAppSelector(state => state.categories.category.words);
	const title = useAppSelector(state => state.categories.category.name);

	useEffect(() => {
		dispatch(fetchCategory(Number(id)));
		dispatch(setIsPlay(false))
	}, [dispatch, id]);


	return (
		<div className={styles.wrapper}>
			<div className={styles.titleArea}>
				<h2>{title && title}</h2>
			</div>
			<div className={styles.cardsBlock}>
				{!words
					? <div>Loading...</div>
					: (
						<div className={styles.cardsBlockWrapper}>
							{!isPlay
								? words.map(el => {
									return (
										<TrainCard key={el.id} engWord={el.eng} rusWord={el.rus}
										           img={el.img} audio={el.audio}/>
									);
								})
								: <Play words={words}/>
							}
						</div>)
				}
			</div>
		</div>
	);
};