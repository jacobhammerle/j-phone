import _ from 'lodash';
import React, { Component } from 'react';
import { Calendar } from 'react-native-calendars';
import { connect } from 'react-redux';
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { selectDay, dayUpdate, dayCreate, dayFetch } from '../actions';
import DateTimePicker from 'react-native-modal-datetime-picker';

class HomeScreen extends Component {
	componentWillMount() {
		this.props.dayFetch();

		//_.each(this.props.days, (value, prop) => {
			//this.props.dayUpdate({ prop, value });
		//})
		//console.log(this.props);
	}
	
	state = {
		isDateTimePickerVisible: false
	};

	_showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

	_hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

	_handleNewDatePicked = (date) => {
		const dayOfWeek = this.getDayOfWeek(this.props.day.day.dateString);

		const dateString = date.toString();

		//console.log(this.props.activeDays, { uid: this.props.activeDays.uid });

		//console.log(this.props);

		//console.log(Object.keys(this.props.activeDays));

	    this.props.dayCreate({ 
	    	callTime: this.formatAMPM(date), 
	    	dayOfWeek: dayOfWeek, 
	    	dateString: this.props.day.day.dateString,
	    	completed: false
	    });

	    _.each(this.props.activeDays, (value, prop) => {
			this.props.dayUpdate({ prop, value });
		})

		console.log(this.props);

	    this._hideDateTimePicker();
	};

	_handleUpdatedDatePicked = (date) => {
		const dayOfWeek = this.getDayOfWeek(this.props.day.day.dateString);
		const dateString = date.toString();

		this.grabSelectedKey(this.props.day.day.dateString);

	    //this.props.daySave({ 
	    	//callTime: this.formatAMPM(date), 
	    	//dayOfWeek: dayOfWeek, 
	    	//dateString: this.props.day.day.dateString,
	    	//completed: false
	    //});

	    //_.each(this.props.activeDays, (value, prop) => {
			//this.props.dayUpdate({ prop, value });
		//})

		//console.log(this.props);

	    this._hideDateTimePicker();
	};

	onDayPress(day) {
		const dateObj = {
			[day.day.dateString]: {
				selected: true,
				color: '#2DB1EF'
			},
			'2018-03-12': {
				marked: true
			},
			'2018-03-16': {
				selected: true, 
				selectedColor: 'red'
			}
		}

		var selectedKey = this.grabSelectedKey(day.day.dateString);

		console.log(selectedKey);

		this.setState({ selectedDate: dateObj })
		this.props.selectDay(day);
	}

	grabSelectedKey(dateString) {
		_.find(this.props.activeDays , (value, key) => {
				if (value.dateString === dateString) {
					console.log(key);
				}
		});
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
				<View>
					<Text style={styles.callSetStyle}>
			        	{findDay.callTime}
			        </Text>
			        <TouchableOpacity onPress={this._showDateTimePicker}>
			        	<Text style={styles.callButtonStyle}>
			        		Change Time
			        	</Text>
		        	</TouchableOpacity>
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
			<View>
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

	render() {
		return (
			<ScrollView style={styles.container}>
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
	}
}

const mapStateToProps = state => {
	console.log('State', state)

	//const updatedDays = _.map(state.calendar, (val, uid) => {
		//return { ...val, uid }
	//})

	return {
		day: state.calendar.day,
		call: state.calendar.call,
		activeDays: state.calendar.activeDays
	}
}

export default connect(mapStateToProps, { selectDay, dayUpdate, dayCreate, dayFetch })(HomeScreen);
