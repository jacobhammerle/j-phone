import { 
	SELECTED_DAY
} from './types';

export const selectedDay = (day) => {
	return {
		type: SELECTED_DAY,
		payload: day
	}
}