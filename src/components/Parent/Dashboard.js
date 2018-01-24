import React, { Component } from 'react';
import { View, BackHandler, FlatList, Dimensions } from 'react-native';
import { Button, Icon, Text } from '@shoutem/ui';
import ChildListItem from './ChildListItem';

class Dashboard extends Component {
  static navigationOptions = {
    title: 'Dashboard',
    headerLeft: null
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress() {
    return true;
  }

  renderEmptyList() {
    return (
      <View style={{ alignSelf: 'center' }}>
        <Button style={{ ...styles.roundButtonStyle, ...styles.emptyListStyle }}>
          <Icon name="add-friend" style={{ color: '#fff' }} />
        </Button>
        <Text>Add Child</Text>
      </View>
    );
  }

  renderFabButton() {
    if (!this.data) {
      return;
    }

    return ( // eslint-disable-line
      <Button style={{ ...styles.roundButtonStyle, ...styles.fabButtonStyle }}>
        <Icon name="add-friend" style={{ color: '#fff' }} />
      </Button>
    );
  }

  render() {
    return (
      <View style={{ height: win.height - 80 }}>
        <FlatList
          data={[]}
          renderItem={({ item }) => <ChildListItem child={item} />}
          ListEmptyComponent={this.renderEmptyList.bind(this)}
        />
        {this.renderFabButton()}
      </View>
    );
  }
}

const win = Dimensions.get('window');

const styles = {
  roundButtonStyle: {
    borderWidth: 0,
    borderRadius: 50,
    backgroundColor: '#2980b9',
    width: 60,
    height: 60,
    elevation: 2
  },

  fabButtonStyle: {
    bottom: 10,
    right: 10,
    position: 'absolute'
  },

  emptyListStyle: {
    alignSelf: 'center',
    marginTop: 60,
    marginBottom: 10
  }
};

export default Dashboard;
