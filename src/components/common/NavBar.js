import React from 'react';
import { View, Text } from 'react-native';

const NavBar = (props) => {
	return (
		<View style={styles.navContainer}>
			<Text>
				Hello World
			</Text>
		</View>
	)
}

const styles = {
	navContainer: {
		padding: 15,
		marginTop: 20,
		backgroundColor: '#F7F7F7',
		alignItems: 'center'
	}
}

export default NavBar;