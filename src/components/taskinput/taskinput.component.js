import React, { Component } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { connect } from 'react-redux';

import { startAddItem } from '../../actions/tasks';
import styles from './taskinput.style';

export class Taskinput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: ''
		}

		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleTextChange(text) {
		this.setState({ text })
	}

	handleSubmit() {
		if (this.state.text.length > 0) {
			this.props.startAddItem(this.state.text.trim())
				.then(() => {
					this.setState({
						text: ''
					});
				})
				.catch(() => {
					console.log('Error adding item (component)');
				});
		}
	}

	render() {
		return <View style={styles.textinput__view}>
			<TextInput
				value={this.state.text}
				onChangeText={this.handleTextChange}
				placeholder="What do you want to do?"
				onSubmitEditing={this.handleSubmit}
				underlineColorAndroid="#37474F"
				style={styles.textinput__input}
				selectionColor="#37474F"
			/>
		</View>
	}
}

const mapDispatchToProps = (dispatch) => ({
	startAddItem: (item) => dispatch(startAddItem(item))
});

export default connect(undefined, mapDispatchToProps)(Taskinput);