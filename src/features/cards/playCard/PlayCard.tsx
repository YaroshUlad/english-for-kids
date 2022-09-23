import React from 'react';

import styles from './PlayCard.module.css'

type PlayCardPropsType = {
	id: number;
	image: string;
	engWord: string;
	onClick: (id: number) => void
}

export const PlayCard: React.FC<PlayCardPropsType> = ({id,onClick,image, engWord}) => {
	return (
		<div className={styles.wrapper} onClick={()=>onClick(id)}>
			<img src={image} alt={engWord}/>
		</div>
	);
};
