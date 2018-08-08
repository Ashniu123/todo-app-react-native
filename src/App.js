import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

import AppCore from './components/appcore.component';
import { startFetchData } from './actions/tasks';

const store = applyMiddleware(thunk)(createStore)(reducers);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppCore />
      </Provider>
    );
  }
}

(
  () => {
    store.dispatch(startFetchData());
  }
)();