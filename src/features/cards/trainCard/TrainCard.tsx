import React, {useState} from 'react';

import styles from './TrainCard.module.css';
import {IconButton} from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';

type TrainCardPropsType = {
	engWord: string;
	rusWord: string;
	img: string;
	audio: string;
}

export const TrainCard: React.FC<TrainCardPropsType> = ({engWord, rusWord, img, audio}) => {
	const [isAnswer, setIsAnswer] = useState<boolean>(false);

	const switchToRus = () => {
		setIsAnswer(true);
		const id = setTimeout(() => {
			setIsAnswer(false);
			clearTimeout(id)
		}, 3000);
	};

	const fetchAudio = async () => {
		const au = new Audio(audio)
		await au.play()
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.imageArea} onClick={fetchAudio}>
				<img src={img} alt={engWord}/>
			</div>
			<div className={styles.wordArea}>
				{isAnswer
					? <div className={styles.word}>{rusWord}</div>
					: <div className={styles.questionArea}>
						<div className={styles.word}>{engWord}</div>
						<div className={styles.switcher}>
							<IconButton onClick={switchToRus}>
								<AutorenewIcon/>
							</IconButton>
						</div>
					</div>}
			</div>
		</div>
	);
};