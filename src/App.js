import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { View } from '@shoutem/ui';
import Router from './Router';
import reducers from './store/reducers';
import { SET_ORIENTATION } from './store/types';
// import { appLayout } from './store/actions';

export default class App extends Component {
  state = {};

  onLayout(event) {
    this.store.dispatch({ type: SET_ORIENTATION, payload: event.nativeEvent.layout });
  }

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
        <View style={{ flex: 1 }} onLayout={this.onLayout.bind(this)}>
          <Router />
        </View>
      </Provider>
    );
  }
}
