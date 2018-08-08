import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import styles from './appcore.style';

import Header from './header/header.component';
import Footer from './footer/footer.component';
import Tasklist from './taskslist/tasklist.component';
import Taskinput from './taskinput/taskinput.component';

export default App = () => (
	<View style={styles.container}>
		<Header />
		<Taskinput />
		<ScrollView>
			<Tasklist />
		</ScrollView>
		<Footer />
	</View>
);