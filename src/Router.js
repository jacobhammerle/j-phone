import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import HomeScreen from './components/HomeScreen';
import UserProfile from './components/UserProfile';

const RouterComponent = () => {
	return (
		<Router>
			<Scene key="root" hideNavBar>
				<Scene key="auth">
					<Scene key="LoginForm" component={LoginForm} title="Login" />
				</Scene>
				<Scene key="main">
					<Scene 
						leftTitle="Profile"
						onLeft={() => Actions.Profile()} 
						key="HomeScreen" 
						component={HomeScreen} 
						title="Calendar"
						initial 
					/>
					<Scene 
						key="Profile" 
						component={UserProfile} 
						title="Profile"
					/>
				</Scene>
			</Scene>
		</Router>
	)
}

export default RouterComponent;