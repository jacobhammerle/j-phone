import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
	onEmailChange(text) {
		this.props.emailChanged(text);
	}

	onPasswordChange(text) {
		this.props.passwordChanged(text);
	}

	onButtonPress() {
		const { email, password } = this.props;

		this.props.loginUser({ email, password });
	}

	renderButton() {
		if (this.props.loading) {
			return <Spinner size="large" />;
		}

		return (
			<Button onPress={this.onButtonPress.bind(this)}>
				Log In
			</Button>
		)
	}

	renderError() {
		if (this.props.error) {
			return (
				<View style={{ backgroundColor: '#fff' }}>
					<Text style={styles.errorTextStyle}>
						{this.props.error}
					</Text>
				</View>
			)
		}
	}

	render() {
		return (
			<View style={styles.loginContainer}>
				<Card>
					<CardSection>
						<Input
							label="Email"
							placeholder="Email"
							onChangeText={this.onEmailChange.bind(this)}
							value={this.props.email}
						/>
					</CardSection>

					<CardSection>
						<Input
							secureTextEntry
							label="Password"
							placeholder="Password"
							onChangeText={this.onPasswordChange.bind(this)}
							value={this.props.password}
						/>
					</CardSection>

					{this.renderError()}

					<CardSection>
						{this.renderButton()}
					</CardSection>

					<TouchableOpacity onPress={() => Actions.SignUpForm()}>
						<Text style={styles.createAccountText}>
							Create an account
						</Text>
					</TouchableOpacity>
				</Card>
			</View>
		)
	}
}

const styles = {
	loginContainer: {
		flex: 1,
		backgroundColor: '#F7F7F7'
	},
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	},
	createAccountText: {
		fontFamily: 'Roboto-Regular',
		alignSelf: 'center',
		marginTop: 20,
		color: '#000'
	}
}

const mapStateToProps = state => {
	return {
		email: state.auth.email,
		password: state.auth.password,
		error: state.auth.error,
		loading: state.auth.loading
	}
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);