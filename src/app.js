import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import LoginForm from './components/LoginForm';
import Router from './Router';

class App extends Component {
	componentWillMount() {
		var config = {
		    apiKey: 'AIzaSyDpvVjNdlhkdQV2DI1tb-tBDRSHjEjF8o0',
		    authDomain: 'j-phone-f984d.firebaseapp.com',
		    databaseURL: 'https://j-phone-f984d.firebaseio.com',
		    projectId: 'j-phone-f984d',
		    storageBucket: 'j-phone-f984d.appspot.com',
		    messagingSenderId: '397589243205'
		};

		firebase.initializeApp(config);
	}

	render() {
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

		return (
			<Provider store={store}>
				<Router />
			</Provider>
		)
	}
}

export default App;