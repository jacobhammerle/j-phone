import React, { Component } from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

class CalendarView extends Component {
	render() {
		return (
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
				onDayPress={(day) => {console.log('selected day', day)}}
				monthFormat={'MMMM'}
				hideArrows={false}
				hideExtraDays={true}
				disableMonthChange={false}
				firstDay={1}
			/>
		)
	}
}

export default CalendarView;