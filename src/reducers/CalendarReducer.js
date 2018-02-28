import { 
	SELECTED_DAY,
	DAY_CREATE
} from '../actions/types';

const INITIAL_STATE = { 
	day: '',
	call: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SELECTED_DAY:
			return { ...state, day: action.payload };
		case DAY_CREATE:
			return { ...state, call: action.payload };
		default:
			return state;
	}
}