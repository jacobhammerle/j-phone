import { 
	SELECTED_DAY
} from '../actions/types';

const INITIAL_STATE = { day: '' };

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SELECTED_DAY:
			return { ...state, day: action.payload };
		default:
			return state;
	}
}