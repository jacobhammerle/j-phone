import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import HomeScreen from './components/HomeScreen';

const RouterComponent = () => {
	return (
		<Router>
			<Scene key="root" hideNavBar>
				<Scene key="auth">
					<Scene key="LoginForm" component={LoginForm} title="Login" />
				</Scene>
				<Scene key="main">
					<Scene 
						key="HomeScreen" 
						component={HomeScreen} 
						title="Calendar"
						initial 
					/>
				</Scene>
			</Scene>
		</Router>
	)
}

export default RouterComponent;