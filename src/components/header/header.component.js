import React from 'react';
import { View, Text } from 'react-native';

import styles from './header.style';

export default Header = () => (
	<View style={styles.header__view}>
		<Text style={styles.header__text}>
			Todo List
		</Text>
	</View>
);