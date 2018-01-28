import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { View } from '@shoutem/ui';
import Router from './Router';
import reducers from './store/reducers';

export default class App extends Component {
  state = {};
  static navigationOptions = {
    header: null
  }

  componentWillMount() {
    this.store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    this.setState({ starting: true });
  }

  render() {
    return (
      <Provider store={this.store}>
        <View style={{ flex: 1 }}>
          <Router />
        </View>
      </Provider>
    );
  }
}
