import React, { Component } from 'react';
import { Calendar } from 'react-native-calendars';
import { connect } from 'react-redux';
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { selectDay } from '../actions';
import DateTimePicker from 'react-native-modal-datetime-picker';
// import Sound from 'react-native-sound';

class HomeScreen extends Component {
	state = {
		isDateTimePickerVisible: false,
		selectedDate: {}
	};

	_showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

	_hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

	_handleDatePicked = (date) => {
	    console.log('A date has been picked: ', date);
	    this._hideDateTimePicker();
	};

	onDayPress(day) {
		const dateObj = {
			[day.day.dateString]: {
				selected: true,
				color: '#2DB1EF'
			},
			'2018-02-12': {
				marked: true
			}
		}

		this.setState({ selectedDate: dateObj })
		this.props.selectDay(day);
	}

	getDayOfWeek(date) {
	  	const dayOfWeek = new Date(date).getDay();
	  	return isNaN(dayOfWeek) ? null : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][dayOfWeek];
	}

	renderSelectedDay() {
		if (this.props.day) {
			return (
				<View style={{ flex: 1 }}>
					<Text style={styles.dayNumber}>
						{this.props.day.day.day}
					</Text>
					<Text style={styles.dayOfWeek}>
						{this.getDayOfWeek(this.props.day.day.dateString)}
					</Text>
					<TouchableOpacity onPress={this._showDateTimePicker}>
				        <Text>
				        	Show DatePicker
				        </Text>
			        </TouchableOpacity>
			        <DateTimePicker
			          isVisible={this.state.isDateTimePickerVisible}
			          onConfirm={this._handleDatePicked}
			          onCancel={this._hideDateTimePicker}
			        />
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
					markedDates={this.state.selectedDate}
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
		fontWeight: 'bold',
		color: '#FFFFFF',
	    textAlign: 'center',
	    paddingTop: 10,
	    paddingBottom: 5,
	    backgroundColor: '#2DB1EF'
  	},
  	dayOfWeek: {
	    textAlign: 'center',
	    color: '#FFFFFF',
	    paddingBottom: 5,
	    backgroundColor: '#2DB1EF'
  	},
	container: {
	    flex: 1,
	    backgroundColor: '#2DB1EF'
  	}
}

const mapStateToProps = state => {
	return {
		day: state.calendar.day
	}
}

export default connect(mapStateToProps, { selectDay })(HomeScreen);
