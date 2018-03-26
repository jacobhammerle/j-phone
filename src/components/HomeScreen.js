import _ from 'lodash';
import React, { Component } from 'react';
import { Calendar } from 'react-native-calendars';
import { connect } from 'react-redux';
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { selectDay, dayCreate, dayFetch, daySave, dayDelete } from '../actions';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Sound from 'react-native-sound';

class HomeScreen extends Component {
	componentWillMount() {
		this.props.dayFetch();
	}
	
	state = {
		isDateTimePickerVisible: false
	};

	_showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

	_hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

	_handleNewDatePicked = (date) => {
		const dayOfWeek = this.getDayOfWeek(this.props.day.day.dateString);
		const dateString = date.toString();

	    this.props.dayCreate({ 
	    	callTime: this.formatAMPM(date), 
	    	dayOfWeek: dayOfWeek, 
	    	dateString: this.props.day.day.dateString,
	    	completed: false
	    });

	    this._hideDateTimePicker();
	};

	_handleUpdatedDatePicked = (date) => {
		const dayOfWeek = this.getDayOfWeek(this.props.day.day.dateString);
		const dateString = date.toString();
		const getKeyByValue = _.findKey(this.props.activeDays, ['dateString', this.props.day.day.dateString]);

	    this.props.daySave({ 
	    	callTime: this.formatAMPM(date), 
	    	dayOfWeek: dayOfWeek, 
	    	dateString: this.props.day.day.dateString,
	    	completed: false,
	    	uid: getKeyByValue
	    });

	    this._hideDateTimePicker();
	};

	onDayPress(day) {

		console.log('Day', day);

		const dateObj = {
			[day.day.dateString]: {
				selected: true,
				color: '#2DB1EF'
			}
		}

		for (var key in this.props.activeDays) {
		    if (!this.props.activeDays.hasOwnProperty(key)) continue;

		    var obj = this.props.activeDays[key];
		    dateObj[obj.dateString] = { marked: true };
		}

		this.setState({ selectedDate: dateObj })
		this.props.selectDay(day);
	}

	getDayOfWeek(date) {
	  	const dayOfWeek = new Date(date).getDay();
	  	return isNaN(dayOfWeek) ? null : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][dayOfWeek];
	}

	formatAMPM(date) {
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12;
		minutes = minutes < 10 ? '0'+minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
		return strTime;
	}

	renderSelectedDay() {
		if (this.props.day) {

			const findDay = _.find(this.props.activeDays, { 'dateString': this.props.day.day.dateString });

			return (
				<View>
					<Text style={styles.dayNumber}>
						{this.props.day.day.day}
					</Text>
					<Text style={styles.dayOfWeek}>
						{this.getDayOfWeek(this.props.day.day.dateString)}
					</Text>
					{this.renderCallView(findDay)}
				</View>
			)
		}
	}

	renderCallView(findDay) {
		if (findDay) {
			return (
				<View style={styles.callDetail}>
					<Text style={styles.staticCallText}>
						Call Time:
					</Text>
					<Text style={styles.callSetStyle}>
			        	{findDay.callTime}
			        </Text>
			        <View style={styles.buttonContainer}>
				        <TouchableOpacity onPress={this._showDateTimePicker} style={styles.changeTimeBtn}>
				        	<Text style={styles.callButtonStyle}>
				        		Change Time
				        	</Text>
			        	</TouchableOpacity>
			        	<TouchableOpacity onPress={() => this.deleteSelectedDay(findDay)} style={styles.deleteBtn}>
				        	<Text style={styles.callButtonStyle}>
				        		Delete
				        	</Text>
			        	</TouchableOpacity>
		        	</View>
		        	<DateTimePicker
			          mode="time"
			          isVisible={this.state.isDateTimePickerVisible}
			          onConfirm={this._handleUpdatedDatePicked}
			          onCancel={this._hideDateTimePicker}
			          titleIOS="Pick a call time"
					/>
	        	</View>
			)
		}

		return (
			<View style={styles.callDetail}>
				<TouchableOpacity onPress={this._showDateTimePicker}>
			        <Text style={styles.callButtonStyle}>
			        	Call Time
			        </Text>
		        </TouchableOpacity>
		        <DateTimePicker
		          mode="time"
		          isVisible={this.state.isDateTimePickerVisible}
		          onConfirm={this._handleNewDatePicked}
		          onCancel={this._hideDateTimePicker}
		          titleIOS="Pick a call time"
				/>
			</View>
		)
	}

	deleteSelectedDay(findDay) {
		const getKeyByValue = _.findKey(this.props.activeDays, ['dateString', findDay.dateString]);
		this.props.dayDelete({ uid: getKeyByValue });
	}

	render() {
		return (
			<View style={styles.container}>
				<Calendar
					style={styles.calendar}
					current={Date()}
					minDate={'2017-11-01'}
					maxDate={'2018-05-30'}
					onDayPress={day => this.onDayPress({ day: day })}
					monthFormat={'MMMM'}
					hideArrows={false}
					hideExtraDays={true}
					disableMonthChange={false}
					markedDates={this.state.selectedDate}
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
	},
	calendar: {
	    borderTopWidth: 1,
	    paddingTop: 5,
	    borderBottomWidth: 1,
	    borderColor: '#eee',
	    height: 350
  	},
	dayNumber: {
		fontSize: 40,
		fontWeight: 'bold',
		color: '#FFFFFF',
	    textAlign: 'center',
	    paddingTop: 15
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
	},
	callSetStyle: {
		textAlign: 'center',
		backgroundColor: '#2DB1EF',
		fontSize: 30,
		color: '#FFFFFF',
		padding: 7,
		marginLeft: 10,
		marginRight: 10,
		borderRadius: 5,
		alignSelf: 'center'
	},
	staticCallText: {
		alignSelf: 'center',
		color: '#FFFFFF'
	},
	callDetail: {
		height: 200
	},
	buttonContainer: {
		flex: 1, 
		flexDirection: 'row',
		alignSelf: 'center'
	},
	changeTimeBtn: {
		width: 130
	},
	deleteBtn: {
		width: 80
	}
}

const mapStateToProps = state => {
	return {
		day: state.calendar.day,
		call: state.calendar.call,
		activeDays: state.calendar.activeDays
	}
}

export default connect(mapStateToProps, { selectDay, dayCreate, dayFetch, daySave, dayDelete })(HomeScreen);
