import React, { Component } from 'react';
import { View, Text } from 'react-native';

const CalendarDetail = ({ selectedDay }) => {
	return (
		<View>
			<Text>
				Selected Day: {selectedDay}
			</Text>
		</View>
	)
}

export { CalendarDetail };