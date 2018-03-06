import { 
	SELECTED_DAY,
	DAY_UPDATE,
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
			//console.log(action.payload);
			//console.log(Object.keys(action.payload));
			return { ...state, activeDays: action.payload };
		case DAY_UPDATE:
			console.log(action.payload);
			// action.payload === { prop: 'name', value: 'jane' }
			return { ...state, [action.payload.prop]: action.payload.value }
		default:
			return state;
	}
}