import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import HomeScreen from './components/HomeScreen';
import UserProfile from './components/UserProfile';

const RouterComponent = () => {
	return (
		<Router>
			<Scene key="root" hideNavBar>
				<Scene key="auth">
					<Scene 
						key="LoginForm" 
						component={LoginForm}
						onLeft="false"
						hideNavBar={true}
					/>
					<Scene 
						key="SignUpForm" 
						component={SignUpForm}
						onLeft="false"
						hideNavBar={true}
					/>
				</Scene>
				<Scene key="main">
					<Scene 
						leftTitle="Profile"
						onLeft={() => Actions.Profile()} 
						key="HomeScreen" 
						component={HomeScreen} 
						hideNavBar={true}
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