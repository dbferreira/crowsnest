import React, { Component } from 'react';
import { View, Text, BackHandler } from 'react-native';

class Dashboard extends Component {
  static navigationOptions = {
    title: 'Parent dashboard',
    headerLeft: null
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    return true;
  };

  render() {
    return (
      <View>
        <Text> Parent dashboard </Text>
      </View>
    );
  }
}

export default Dashboard;
