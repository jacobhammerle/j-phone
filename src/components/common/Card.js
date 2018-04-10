import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
	return (
		<View style={styles.containerStyle}>
			{props.children}
		</View>
	)
}

const styles = {
	containerStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		borderRadius: 2,
		elevation: 1,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10
	}
}

export { Card };