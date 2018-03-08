import { 
	SELECTED_DAY,
	DAY_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = { 
	day: '',
	callTime: '',
	completed: false,
	dateString: '',
	dayOfWeek: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SELECTED_DAY:
			return { ...state, day: action.payload };
		case DAY_FETCH_SUCCESS:
			return { ...state, activeDays: action.payload };
		default:
			return state;
	}
}