import React, {useState} from 'react';

import styles from './Play.module.css';

// @ts-ignore
import correct from '../../../assets/audio/correct2.mp3'
// @ts-ignore
import incorrect from '../../../assets/audio/incorrect.mp3'

import {PlayCard} from '../playCard/PlayCard';
import {WordType} from '../../categories/categories-reducer';

import {Button, Rating} from '@mui/material';

type PlayPropsType = {
	words: WordType[]
}

export const Play: React.FC<PlayPropsType> = ({words}) => {
	const [isStarted, setIsStarted] = useState<boolean>(false);
	const [rating, setRating] = useState<number>(0);
	const [attempt, setAttempt] = useState<number>(0);
	const [playWord, setPlayWord] = useState<null | WordType>(null);
	const [wordsForPlayList, setWordsForPlay] = useState<WordType[]>([...words]);
	const [isEndOfGame, setIsEndOfGame] = useState<boolean>(false);

	const maxRating = words.length;

	const getRandomInt = (n: number) => {
		return Math.floor(Math.random() * n);
	};

	const startNewGameRound = async () => {
		if (wordsForPlayList.length === 0) {
			setIsEndOfGame(true);
			setIsStarted(false);
		}
		const index = getRandomInt(wordsForPlayList.length);
		setPlayWord(wordsForPlayList[index]);
		setWordsForPlay(wordsForPlayList.filter(el => el.id !== wordsForPlayList[index].id));
		setAttempt(0);
		const au = new Audio(wordsForPlayList[index].audio);
		await au.play();
	};

	const startGame = async () => {
		setIsStarted(true);
		await startNewGameRound();
	};

	const handleAnswerAttempt = async (id: number) => {
		if (isStarted) {
			setAttempt(state => state + 1);
			if (playWord && playWord.id !== id) {
				//	add sound of bad attempt
				const au = new Audio(incorrect)
				await au.play()
			}
			if (playWord && playWord.id === id && attempt === 0) {
				setRating(state => state + 1);
				//	add sound of good attempt
				const au = new Audio(correct)
				await au.play()
				setTimeout(()=>{
					startNewGameRound();
				}, 1500)

			}
			if (playWord && playWord.id === id && attempt > 0) {
				const au = new Audio(correct)
				await au.play()
				setTimeout(()=>{
					startNewGameRound();
				}, 1500)
			}
		}
	};

	return (
		<div className={styles.wrapper}>
			{isEndOfGame
				? <div>Your result {rating}/{maxRating}</div>
				: <>
					<div className={styles.cardsArea}>
						{words && words.map(el => {
							return (
								<PlayCard key={el.id} id={el.id} image={el.img} engWord={el.eng}
								          onClick={handleAnswerAttempt}/>
							);
						})}
					</div>
					{isStarted
						? <div>
							<Rating size={'large'} readOnly name="customized-10" value={rating}
							        max={maxRating}/>
						</div>
						: <div>
							<Button onClick={startGame}>
								Start game
							</Button>
						</div>}
				</>
			}
		</div>
	);
};