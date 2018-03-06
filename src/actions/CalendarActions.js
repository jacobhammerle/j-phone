import firebase from 'firebase';
import {
	DAY_UPDATE,
	SELECTED_DAY,
	DAY_CREATE,
	DAY_FETCH_SUCCESS,
	CLEAR_DAY
} from './types';

export const selectDay = (day) => {
	return {
		type: SELECTED_DAY,
		payload: day
	}
}

export const dayUpdate = ({ prop, value }) => {
	return {
		type: DAY_UPDATE,
		payload: {prop, value }
	}
}

export const dayCreate = ({ callTime, dayOfWeek, dateString, completed }) => {
	const { currentUser } = firebase.auth();
	const id = currentUser.uid;

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/days`)
			.push({ callTime, dayOfWeek, dateString, completed, id })
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

export const daySave = ({ callTime, dayOfWeek, dateString, completed, uid }) => {
  const { currentUser } = firebase.auth()

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/days/${uid}`)
      .set({ callTime, dayOfWeek, dateString, completed })
      .then(() => {
        dispatch({ type: CLEAR_DAY })
        Actions.pop()
      })
  }
}

export const clearDay = () => {
    return (dispatch) => dispatch({
        type: CLEAR_DAY
    })
}
