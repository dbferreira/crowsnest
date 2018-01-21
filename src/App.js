import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import { View } from '@shoutem/ui';
import reducers from './store/reducers';
import LoginForm from './components/Auth/LoginForm';

export default class componentName extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyCE9FlWq03vmu4qHOIDocX4vaD0mofcW9A',
      authDomain: 'crows-nest-1.firebaseapp.com',
      databaseURL: 'https://crows-nest-1.firebaseio.com',
      projectId: 'crows-nest-1',
      storageBucket: 'crows-nest-1.appspot.com',
      messagingSenderId: '1044256479091',
    };

    firebase.initializeApp(config);
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <LoginForm />
        </View>
      </Provider>
    );
  }
}
