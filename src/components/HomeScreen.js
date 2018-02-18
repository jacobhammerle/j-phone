import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { selectedDay } from '../actions';

class HomeScreen extends Component {
	onDayPress(day) {
		console.log(this.props.day.day);
		this.props.selectedDay(day);
	}

	renderSelectedDay(day) {
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

	renderSelectedDay() {
		if (this.props.day) {
			return (
				<Text style={styles.dayTextStyle}>
					{this.props.day.day.day}
				</Text>
			)
		}
	}

	render() {
		return (
			<View>
				<Calendar
					style={{
						height: 500
					}}
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
					onDayPress={day => this.onDayPress({ day: day })}
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

const styles = {
	dayTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'green'
	}
}

const mapStateToProps = state => {
	return {
		day: state.calendar.day
	}
}

export default connect(mapStateToProps, { selectedDay })(HomeScreen);