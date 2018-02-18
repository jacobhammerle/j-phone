import React, { Component } from 'react';
import { Calendar } from 'react-native-calendars';
import { connect } from 'react-redux';
import { ScrollView, Text } from 'react-native';
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
				<Text style={styles.text}>
					{this.props.day.day.day}
				</Text>
			)
		}
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<Calendar
					style={styles.calendar}
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
			</ScrollView>
		)
	}
}

const styles = {
	dayTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'green'
	},
	calendar: {
	    borderTopWidth: 1,
	    paddingTop: 5,
	    borderBottomWidth: 1,
	    borderColor: '#eee',
	    height: 350
  	},
	text: {
	    textAlign: 'center',
	    borderColor: '#bbb',
	    padding: 10,
	    backgroundColor: '#eee'
  	},
	container: {
	    flex: 1,
	    backgroundColor: 'gray'
  	}
}

const mapStateToProps = state => {
	return {
		day: state.calendar.day
	}
}

export default connect(mapStateToProps, { selectedDay })(HomeScreen);