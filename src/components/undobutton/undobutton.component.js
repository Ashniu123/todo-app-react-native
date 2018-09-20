import React, { Component } from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';

import { startRestoreState } from '../../actions/tasks';

import styles from './undobutton.style';

export class UndoButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };

    this.handleOnPress = this.handleOnPress.bind(this);
    this.showTimeout = null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.length > this.props.data.length) {
      this.setState(
        {
          show: true
        },
        () => {
          this.showTimeout = null;
          this.showTimeout = setTimeout(() => {
            this.setState({
              show: false
            });
          }, 5000);
        }
      );
    }
  }

  handleOnPress() {
    this.setState(
      {
        show: false
      },
      this.props.startRestoreState
    );
  }

  render() {
    return (
      this.state.show && (
        <Animatable.View animation="fadeInUp" duration={500} style={styles.undobutton__view}>
          <Button
            color="#606060"
            title="UNDO"
            accessibilityLabel="Undo"
            onPress={this.handleOnPress}
          />
        </Animatable.View>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.tasks.data
});

const mapDispatchToProps = (dispatch) => ({
  startRestoreState: () => dispatch(startRestoreState())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UndoButton);
