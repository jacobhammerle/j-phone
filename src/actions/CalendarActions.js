import firebase from 'firebase';
import {
	SELECTED_DAY,
	DAY_CREATE
} from './types';

export const selectDay = (day) => {
	return {
		type: SELECTED_DAY,
		payload: day
	}
}

export const dayCreate = (call) => {
	const { currentUser } = firebase.auth();
	console.log(call);

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/days`)
			.push(call)
			.then(() => {
				dispatch({ 
					type: DAY_CREATE
				});
			});
	}
}
