import React, { Component } from 'react';
import { View, Text, } from 'react-native';

class Activities extends Component {
  static navigationOptions = {
    title: 'Activities',
    headerLeft: null
  }

  render() {
    return (
      <View>
        <Text> Activities (Child) </Text>
      </View>
    );
  }
}

export default Activities;
