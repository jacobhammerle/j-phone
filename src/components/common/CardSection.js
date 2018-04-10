import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
	return (
		<View style={[styles.containerStyle, props.style]}>
			{props.children}
		</View>
	)
}

const styles = {
		containerStyle: {
			padding: 10,
			backgroundColor: '#F7F7F7',
			flexDirection: 'row',
		}
}

export { CardSection };

