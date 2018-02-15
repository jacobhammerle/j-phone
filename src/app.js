import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { View, Text } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import firebase from 'firebase';
import { Header } from './components/common';

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
		return (
			<Provider store={createStore(reducers)}>
				<Header headerText="J-Phone" />
			</Provider>
		)
	}
}

export default App;