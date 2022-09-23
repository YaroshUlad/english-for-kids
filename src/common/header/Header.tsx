import React from 'react';

import styles from './Header.module.css'
import {SwitchTrainPlay} from './switch/SwitchTrainPlay';
import {MenuBurger} from './menu/Menu';
import {useAppSelector} from '../../app/store';

export const Header = () => {
	const isPlay = useAppSelector(state => state.app.isPlay)

	const backGroundColor = isPlay ? 'indianred' : 'coral'

	return (
		<div className={styles.wrapper} style={{backgroundColor: backGroundColor}}>
			<MenuBurger/>
			<SwitchTrainPlay/>
		</div>
	);
};