import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
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
    const firebaseConfig = {
      apiKey: 'AIzaSyCE9FlWq03vmu4qHOIDocX4vaD0mofcW9A',
      authDomain: 'crows-nest-1.firebaseapp.com',
      databaseURL: 'https://crows-nest-1.firebaseio.com',
      projectId: 'crows-nest-1',
      storageBucket: 'crows-nest-1.appspot.com',
      messagingSenderId: '1044256479091'
    };

    firebase.initializeApp(firebaseConfig);
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
