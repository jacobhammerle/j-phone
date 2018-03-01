import React, { Component } from 'react';
import { Calendar } from 'react-native-calendars';
import { connect } from 'react-redux';
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { selectDay, dayCreate } from '../actions';
import DateTimePicker from 'react-native-modal-datetime-picker';

class HomeScreen extends Component {
	componentDidMount() {

	}
	
	state = {
		isDateTimePickerVisible: false,
		selectedDate: {},
		selectedCallTime: ''
	};

	_showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

	_hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

	_handleDatePicked = (date) => {
		const dayOfWeek = 'Tuesday';
		const callTime = '11:30 PM';
	    this.props.dayCreate({ callTime: callTime, dayOfWeek: dayOfWeek });
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
			},
			'2018-02-16': {
				selected: true, 
				selectedColor: 'red'
			}
		}
		console.log(this.props);
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
				<View>
					<Text style={styles.dayNumber}>
						{this.props.day.day.day}
					</Text>
					<Text style={styles.dayOfWeek}>
						{this.getDayOfWeek(this.props.day.day.dateString)}
					</Text>
					<TouchableOpacity onPress={this._showDateTimePicker}>
				        <Text style={styles.callButtonStyle}>
				        	Call Time
				        </Text>
			        </TouchableOpacity>
			        <DateTimePicker
			          mode="time"
			          isVisible={this.state.isDateTimePickerVisible}
			          onConfirm={this._handleDatePicked}
			          onCancel={this._hideDateTimePicker}
			          titleIOS="Pick a call time"
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
	    paddingBottom: 10,
	    backgroundColor: '#2DB1EF'
  	},
	container: {
	    flex: 1,
	    backgroundColor: '#2DB1EF'
  	},
  	callButtonStyle: {
		textAlign: 'center',
		backgroundColor: '#2DB1EF',
		color: '#FFFFFF',
		padding: 7,
		marginLeft: 10,
		marginRight: 10,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#FFFFFF',
		alignSelf: 'center'
	}
}

const mapStateToProps = state => {
	return {
		day: state.calendar.day,
		call: state.calendar.call
	}
}

export default connect(mapStateToProps, { selectDay, dayCreate })(HomeScreen);
