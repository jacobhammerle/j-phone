import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

class HomeScreen extends Component {
	render() {
		return (
				<Calendar
				  // Specify style for calendar container element. Default = {}
				  style={{
				    borderWidth: 1,
				    borderColor: 'gray',
				    height: 350
				  }}
				  // Specify theme properties to override specific styles for calendar parts. Default = {}
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
				  // Initially visible month. Default = Date()
				  current={'2018-02-15'}
				  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
				  minDate={'2018-02-01'}
				  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
				  maxDate={'2018-05-30'}
				  // Handler which gets executed on day press. Default = undefined
				  onDayPress={(day) => {console.log('selected day', day)}}
				  // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
				  monthFormat={'MMMM'}
				  hideArrows={false}
				  hideExtraDays={false}
				  disableMonthChange={false}
				  firstDay={1}
				  // Hide day names. Default = false
				  hideDayNames={false}
				/>
		)
	}
}

export default HomeScreen;