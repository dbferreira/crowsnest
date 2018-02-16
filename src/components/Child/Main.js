import React, { Component } from 'react';
import { View, Text, } from 'react-native';

class Main extends Component {
  static navigationOptions = {
    title: 'Child (name?)',
    headerLeft: null
  }

  render() {
    return (
      <View>
        <Text> Main (Child) </Text>
      </View>
    );
  }
}

export default Main;
