import firebase from 'firebase';
import {
	SELECTED_DAY,
	DAY_CREATE,
	DAY_FETCH_SUCCESS
} from './types';

export const selectDay = (day) => {
	return {
		type: SELECTED_DAY,
		payload: day
	}
}

export const dayCreate = ({ callTime, dayOfWeek, dateString, completed }) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/days`)
			.push({ callTime, dayOfWeek, dateString, completed })
			.then(() => {
				dispatch({ 
					type: DAY_CREATE
				});
			});
	}
}

export const dayFetch = () => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/days`)
			.on('value', snapshot => {
				dispatch({ type: DAY_FETCH_SUCCESS, payload: snapshot.val() });
			})
	}
}
