import firebase from 'firebase';
import {
	SELECTED_DAY,
	DAY_CREATE,
	DAY_FETCH_SUCCESS,
	DAY_SAVE,
	DAY_DELETE,
	DAY_TURN_OFF
} from './types';

export const selectDay = (day) => {
	return {
		type: SELECTED_DAY,
		payload: day
	}
}

export const dayCreate = ({ callTime, dayOfWeek, dateString, completed, live }) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/days`)
			.push({ callTime, dayOfWeek, dateString, completed, live })
			.then(() => {
				dispatch({ 
					type: DAY_CREATE
				});
			});
	}
}

export const dayTurnOff = ({ dateString, completed, live }) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/days`)
			.push({ dateString, completed, live })
			.then(() => {
				dispatch({ 
					type: DAY_TURN_OFF
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

export const daySave = ({ callTime, dayOfWeek, dateString, completed, live, uid }) => {
  const { currentUser } = firebase.auth()

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/days/${uid}`)
      .set({ callTime, dayOfWeek, dateString, completed, live })
  }
}

export const dayDelete = ({ uid }) => {
  const { currentUser } = firebase.auth()

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/days/${uid}`)
      .remove()
  }
}
