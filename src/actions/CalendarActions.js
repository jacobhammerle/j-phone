import {
	SELECTED_DAY
} from './types';

export const selectDay = (day) => {
	return {
		type: SELECTED_DAY,
		payload: day
	}
}
