import _ from 'lodash';
import React, { Component } from 'react';
import { Calendar } from 'react-native-calendars';
import { connect } from 'react-redux';
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { selectDay, dayCreate, dayFetch, daySave, dayDelete, dayTurnOff } from '../actions';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Sound from 'react-native-sound';
import NavBar from './common/NavBar';

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
	    	completed: false,
	    	live: true
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
	    	live: true,
	    	uid: getKeyByValue
	    });

	    this._hideDateTimePicker();
	};

	turnOffCall() {
		this.props.dayTurnOff({ dateString: null, completed: false, live: false });
	}

	onDayPress(day) {

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
				<View style={styles.callDetailContainer}>
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
				<View>
					<Text style={styles.callSetStyle}>
			        	{findDay.callTime}
			        </Text>
			        <View style={styles.callDetail}>
				        <TouchableOpacity onPress={this._showDateTimePicker} style={styles.callTimeButtonStyle}>
				        	<Text style={styles.callTimeTextStyle}>
				        		Change Time
				        	</Text>
			        	</TouchableOpacity>
			        	<TouchableOpacity onPress={() => this.deleteSelectedDay(findDay)} style={styles.callTimeButtonStyle}>
				        	<Text style={styles.callTimeTextStyle}>
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
				<TouchableOpacity onPress={this._showDateTimePicker} style={styles.callTimeButtonStyle}>
			        <Text style={styles.callTimeTextStyle}>
			        	Call Time
			        </Text>
		        </TouchableOpacity>
		        <TouchableOpacity onPress={this.turnOffCall} style={styles.callTimeButtonStyle}>
		        	<Text style={styles.callTimeTextStyle}>
			        	Turn Off
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
				<NavBar />
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
					theme={{
						textDayFontFamily: 'Roboto-Black',
    					textMonthFontFamily: 'Roboto-Black',
    					textDayHeaderFontFamily: 'Roboto-Black',
    					textDayFontSize: 18,
    					textMonthFontSize: 25,
    					textDayHeaderFontSize: 14
					}}
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
	    shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		flex: 1,
		flexDirection: 'column',
		alignItems: 'stretch'
  	},
	dayNumber: {
		fontFamily: 'Roboto-Medium',
		fontSize: 42,
		color: '#FFFFFF',
	    textAlign: 'center'
  	},
  	dayOfWeek: {
  		fontFamily: 'Roboto-Medium',
  		fontSize: 20,
	    textAlign: 'center',
	    color: '#FFFFFF',
	    paddingBottom: 15,
	    backgroundColor: '#2DB1EF'
  	},
	container: {
	    flex: 1,
	    flexDirection: 'column',
	    backgroundColor: '#2DB1EF'
  	},
  	callTimeButtonStyle: {
		backgroundColor: '#FFF',
		padding: 15,
		marginLeft: 10,
		marginRight: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		borderRadius: 12,
		flexDirection: 'row'
	},
	callTimeTextStyle: {
		fontFamily: 'Roboto-Bold',
		textAlign: 'center',
		fontSize: 18,
		color: '#000'
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
		fontSize: 40,
		color: '#FFFFFF',
		padding: 7,
		paddingTop: 0,
		paddingBottom: 15,
		alignItems: 'stretch',
		flexDirection: 'column',
	},
	callDetailContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	callDetail: {
		flexDirection: 'row'
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

export default connect(mapStateToProps, { selectDay, dayCreate, dayFetch, daySave, dayDelete, dayTurnOff })(HomeScreen);
