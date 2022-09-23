import React, {ChangeEvent} from 'react';
import {Switch} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {setIsPlay} from '../../../app/app-reducer';

export const SwitchTrainPlay = () => {
	const dispatch = useAppDispatch()
	const isPlay = useAppSelector(state => state.app.isPlay)

	const handleSwitchTrainPlay = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(setIsPlay(e.currentTarget.checked))
	};

	return (
		<div style={{marginRight: '20px'}}>
			<span>Train</span>
			<Switch checked={isPlay}
			        onChange={handleSwitchTrainPlay}
			        size={'medium'}
			        color={'default'}/>
			<span>Play</span>
		</div>
	);
};
