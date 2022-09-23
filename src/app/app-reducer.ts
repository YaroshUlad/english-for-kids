const initialState = {
	isInit: false,
	isLoading: false,
	isPlay: false
};

export const appReducer = (
	state: AppReducerStateType = initialState,
	action: AppActionsType): AppReducerStateType => {
	switch (action.type) {
		case 'APP/init-app':
			return {...state, isInit: true};
		case 'APP/set-is-play':
			return {
				...state, ...action.payload
			}
		default:
			return state;
	}
};

//_________________actions_______________

export const initAppAC = () => {
	return {
		type: 'APP/init-app'
	} as const;
};

export const setIsPlay = (isPlay: boolean) => {
	return {
		type: 'APP/set-is-play',
		payload: {
			isPlay
		}
	} as const;
};

//_________________thunks_______________

//_________________types_________________
type AppReducerStateType = typeof initialState

export type AppActionsType =
	| InitAppAT
	| SetIsPlayAT

type InitAppAT = ReturnType<typeof initAppAC>
type SetIsPlayAT = ReturnType<typeof setIsPlay>