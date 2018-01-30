import React, { Component } from 'react';
import { View, BackHandler, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon, Text } from '@shoutem/ui';
import ChildListItem from './ChildListItem';
import { logoutUser, getChildren, setActiveChild } from '../../store/actions';

class Dashboard extends Component {
  static navigationOptions = {
    title: 'Children'
  }

  componentWillMount() {
    this.props.getChildren();
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }

  onBackPress() {
    console.log('this.props.navigation:', this.props.navigation);

    return true;
  }

  onCreateChildPress() {
    const { navigate } = this.props.navigation;
    this.props.setActiveChild({}, navigate);
  }

  onLogoutButtonPress() {
    const { navigate } = this.props.navigation;
    this.props.logoutUser({ navigate });
  }

  renderEmptyList() {
    return (
      <View style={{ alignSelf: 'center' }}>
        <Button
          style={{ ...styles.roundButtonStyle, ...styles.emptyListStyle }}
          onPress={this.onCreateChildPress.bind(this)}
        >
          <Icon name="add-friend" style={{ color: '#fff' }} />
        </Button>
        <Text>Add Child</Text>
      </View>
    );
  }

  renderFabButton() {
    if (!this.props.children.length) {
      return;
    }

    return ( // eslint-disable-line
      <Button
        style={{ ...styles.roundButtonStyle, ...styles.fabButtonStyle }}
        onPress={this.onCreateChildPress.bind(this)}
      >
        <Icon name="add-friend" style={{ color: '#fff' }} />
      </Button>
    );
  }

  render() {
    if (this.props.loading) {
      return <ActivityIndicator size="large" style={styles.loadingSpinnerStyle} />;
    }

    return (
      <View style={{ height: win.height - 80 }}>
        <FlatList
          data={this.props.children}
          renderItem={({ item }) =>
            <ChildListItem
              child={item}
              navigation={this.props.navigation}
            />}
          ListEmptyComponent={this.renderEmptyList.bind(this)}
        />
        <Button
          style={{ ...styles.roundButtonStyle }}
          onPress={this.onLogoutButtonPress.bind(this)}
        >
          <Icon name="lock" style={{ color: '#fff' }} />
        </Button>
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
  },

  loadingSpinnerStyle: {
    width: 100,
    height: 100,
    marginTop: 50,
    alignSelf: 'center'
  }
};


const mapStateToProps = ({ parent }) => {
  const { children, loading } = parent;

  return { children, loading };
};


export default connect(mapStateToProps, { logoutUser, getChildren, setActiveChild })(Dashboard);
