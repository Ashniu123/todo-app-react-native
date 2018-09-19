import React, { Component } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { connect } from 'react-redux';

import { startEditItem, startRemoveItem } from '../../actions/tasks';
import TasklistItem from './tasklist_item/tasklist_item.component';
import styles from './tasklist.style';

export class Tasklist extends Component {
  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleItemRemove = this.handleItemRemove.bind(this);
    this.handleSetScrollEnabled = this.handleSetScrollEnabled.bind(this);

    this.state = {
      scroll: true
    };
  }

  handleCheckboxChange(key) {
    this.props.startEditItem(key);
  }

  handleItemRemove(key) {
    this.props.startRemoveItem(key);
  }

  handleSetScrollEnabled(enable) {
    this.setState({
      scroll: enable
    });
  }

  renderItem({ item }) {
    return (
      <TasklistItem
        id={item.key}
        item={item.item}
        completed={item.completed}
        onItemRemove={this.handleItemRemove}
        onCheckboxChange={this.handleCheckboxChange}
        setScrollEnabled={this.handleSetScrollEnabled}
      />
    );
  }

  render() {
    return (
      <View style={styles.tasklist__view}>
        <FlatList
          data={this.props.data}
          renderItem={this.renderItem}
          scrollEnabled={this.state.scroll}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.tasks.data
});

const mapDispatchToProps = (dispatch) => ({
  startEditItem: (key) => dispatch(startEditItem(key)),
  startRemoveItem: (key) => dispatch(startRemoveItem(key))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasklist);
