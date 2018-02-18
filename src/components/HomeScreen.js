import React, { Component } from 'react';
import { Calendar } from 'react-native-calendars';
import { connect } from 'react-redux';
import { ScrollView, View, Text } from 'react-native';
import { selectedDay } from '../actions';

class HomeScreen extends Component {
	onDayPress(day) {
		console.log(this.props.day.day);
		this.props.selectedDay(day);
	}

	getDayOfWeek(date) {
	  	const dayOfWeek = new Date(date).getDay();    
	  	return isNaN(dayOfWeek) ? null : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][dayOfWeek];
	}

	renderSelectedDay() {
		if (this.props.day) {
			return (
				<View>
					<Text style={styles.dayNumber}>
						{this.props.day.day.day}
					</Text>
					<Text style={styles.dayOfWeek}>
						{this.getDayOfWeek(this.props.day.day.dateString)}
					</Text>
				</View>
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
	dayNumber: {
		fontSize: 32,
	    textAlign: 'center',
	    paddingTop: 10,
	    paddingBottom: 5,
	    backgroundColor: '#eee'
  	},
  	dayOfWeek: {
	    textAlign: 'center',
	    paddingBottom: 5,
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