import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CalendarReducer from './CalendarReducer';

export default combineReducers({
	auth: AuthReducer,
	calendar: CalendarReducer
})