import React from 'react';

import styles from './Category.module.css'

import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../../app/store';

type CategoryPropsType = {
	id: number;
	name: string;
	deckImage: string;
}
export const Category: React.FC<CategoryPropsType> = ({id, name,deckImage}) => {
	const navigate = useNavigate();

	const isPlay = useAppSelector(state => state.app.isPlay)

	const backGroundColor = isPlay ? 'indianred' : 'coral'

	const handleCategoryClick = () => {
		navigate(`/cards/${id}`);
	};

	return (
		<div onClick={handleCategoryClick} className={styles.wrapper}>
			<div className={styles.imageArea}>
				<img src={deckImage}
				     alt={name}/>
			</div>
			<div className={styles.titleArea} style={{backgroundColor: backGroundColor}}>
				<div className={styles.title}>
					{name}
				</div>
			</div>
		</div>
	);
};