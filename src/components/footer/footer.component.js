import React, { Component } from 'react';
import { View, Button, Alert } from 'react-native';
import { connect } from 'react-redux';

import { startRemoveCompleted } from '../../actions/tasks';
import styles from './footer.style';

export class Footer extends Component {
  constructor(props) {
    super(props);

    this.handleOnPress = this.handleOnPress.bind(this);
  }

  handleOnPress() {
    this.props.startRemoveCompleted();
  }

  render() {
    return (
      <View style={styles.footer__view}>
        <Button
          color="#ef5350"
          title="Remove completed items"
          accessibilityLabel="Remove completed items"
          onPress={this.handleOnPress}
        />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startRemoveCompleted: () => dispatch(startRemoveCompleted())
});

export default connect(
  undefined,
  mapDispatchToProps
)(Footer);
