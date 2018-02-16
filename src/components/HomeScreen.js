import React, { Component } from 'react';
import CalendarView from './CalendarView';
import CalendarDetail from './CalendarDetail';

class HomeScreen extends Component {
	render() {
		return (
			<CalendarView />
			<CalendarDetail />
		)
	}
}

export default HomeScreen;