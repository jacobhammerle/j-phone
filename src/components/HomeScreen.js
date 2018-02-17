import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

class HomeScreen extends Component {

	renderSelectedDay(day) {
		console.log(day);
		if (day) {
			return (
				<Text>
					Selected Day: {day}
				</Text>
			)
		}
		return (
			<Text>
				Selected Day:
			</Text>
		)
	}

	grabSelectedDay(day) {
		console.log(day.day);
		this.renderSelectedDay(day.day);
	}

	render() {
		return (
			<View>
				<Calendar
					style={{}}
					theme={{
						backgroundColor: '#ffffff',
						calendarBackground: '#ffffff',
						textSectionTitleColor: '#b6c1cd',
						selectedDayBackgroundColor: '#00adf5',
						selectedDayTextColor: '#ffffff',
						todayTextColor: '#00adf5',
						dayTextColor: '#2d4150',
						textDisabledColor: '#d9e1e8',
						dotColor: '#00adf5',
						selectedDotColor: '#ffffff',
						arrowColor: 'orange',
						monthTextColor: 'blue',
						textDayFontSize: 16,
						textMonthFontSize: 16,
						textDayHeaderFontSize: 16
					}}
					current={Date()}
					minDate={'2018-02-01'}
					maxDate={'2018-05-30'}
					onDayPress={(day) => this.grabSelectedDay(day)}
					monthFormat={'MMMM'}
					hideArrows={false}
					hideExtraDays={true}
					disableMonthChange={false}
					firstDay={1}
				/>
				{this.renderSelectedDay()}
			</View>
		)
	}
}

export default HomeScreen;