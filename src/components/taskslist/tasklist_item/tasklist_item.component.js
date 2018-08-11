import React, { Component } from 'react';
import { View, Text, Animated, Dimensions, PanResponder, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from './tasklist_item.style';

export default class TasklistItem extends Component {
	constructor(props) {
		super(props);

		this.gestureDelay = -35;
		this.scrollViewEnabled = true;
		this.width = Dimensions.get('window').width;

		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (e, gestureState) => false,
			onMoveShouldSetPanResponder: (e, gestureState) => true,
			onPanResponderTerminationRequest: (e, gestureState) => false,
			onPanResponderMove: (e, gestureState) => this.handlePanResponderMove.call(this, e, gestureState),
			onPanResponderRelease: (e, gestureState) => this.handlePanResponderRelease.call(this, e, gestureState)

		});

		this.state = { position: new Animated.ValueXY() };

		this.setScrollViewEnabled = this.setScrollViewEnabled.bind(this);
	}

	handlePanResponderMove(e, gestureState) {
		if (gestureState.dx > 35) {
			this.setScrollViewEnabled(false);
			const newX = gestureState.dx + this.gestureDelay;
			this.state.position.setValue({ x: newX, y: 0 });
		}
	}

	handlePanResponderRelease(e, gestureState) {
		if (gestureState.dx < this.width / 3) {
			Animated.timing(this.state.position, {
				toValue: { x: 0, y: 0 },
				duration: 150,
			}).start(() => {
				this.setScrollViewEnabled(true);
			});
		} else {
			Animated.timing(this.state.position, {
				toValue: { x: this.width, y: 0 },
				duration: 300,
			}).start(() => {
				this.props.onItemRemove(this.props.id);
				this.setScrollViewEnabled(true);
			});
		}
	}


	setScrollViewEnabled(enabled) {
		if (this.scrollViewEnabled !== enabled) {
			this.scrollViewEnabled = enabled;
			this.props.setScrollEnabled(enabled);
		}
	}

	render() {
		return <View style={styles.container}>
			<Animated.View style={[this.state.position.getLayout()]} {...this.panResponder.panHandlers}>
				<View style={styles.delete__cell}>
					<Text style={styles.delete__text}>DELETE</Text>
				</View>
				<View style={[styles.inner__view, { backgroundColor: this.props.completed ? '#eeeeee' : '#ffffff' }]}>
					<Text style={styles.itemText}>
						{this.props.item}
					</Text>
					<TouchableWithoutFeedback
						hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}>
						<Icon
							type='material-community'
							name={this.props.completed ? 'check-circle' : 'checkbox-blank-circle-outline'}
							onPress={this.props.onCheckboxChange.bind(this, this.props.id)}
						/>
					</TouchableWithoutFeedback>
				</View>
			</Animated.View>
		</View>
	}
}
