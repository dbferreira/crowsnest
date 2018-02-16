import React, { Component } from 'react';
import { View, Text, } from 'react-native';

class Timer extends Component {
  static navigationOptions = {
    title: 'Timer',
    headerLeft: null
  }

  render() {
    return (
      <View>
        <Text> Timer (child) </Text>
      </View>
    );
  }
}

export default Timer;
