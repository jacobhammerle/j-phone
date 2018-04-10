import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
	const { buttonStyle, textStyle } = styles;

	return (
		<TouchableOpacity onPress={onPress} style={buttonStyle}>
			<Text style={textStyle}>
				{children}
			</Text>
		</TouchableOpacity>
	)
}

const styles = {
	textStyle: {
		alignSelf: 'center',
		color: '#fff',
		fontFamily: 'Roboto-Black',
		fontSize: 20,
		paddingTop: 10,
		paddingBottom: 10
	},
	buttonStyle: {
		flex: 1,
		alignItems: 'center',
		width: 100,
		backgroundColor: '#2DB1EF',
		borderRadius: 100,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2
	}
}

export { Button };