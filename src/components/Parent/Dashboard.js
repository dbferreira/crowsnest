import React, { Component } from 'react';
import { Button, Text, View, BackHandler, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
// import { Button, Icon, Text } from '@shoutem/ui';
import BasicListItem from './BasicListItem';
import { setActiveChild } from '../../store/actions';

class Dashboard extends Component {
  state = {};

  static navigationOptions = {
    title: 'Children',
    tabBarIcon: ({ tintColor }) => (
      // <Icon name="users" style={{ color: tintColor }} />
      <Text style={{ color: tintColor }}>oOo</Text>
    ),
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

  onChildPress(child) {
    const { navigate } = this.props.navigation;
    this.props.setActiveChild(child, navigate);
  }

  renderEmptyList() {
    return (
      <View style={{ alignSelf: 'center' }}>
        <Button
          title=""
          style={{ ...styles.roundButtonStyle, ...styles.emptyListStyle }}
          onPress={this.onCreateChildPress.bind(this)}
        >
          <Text style={{ color: '#fff' }}>+ Child</Text>
          {/* <Icon name="add-friend" style={{ color: '#fff' }} /> */}
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
        title=""
        style={{ ...styles.roundButtonStyle, ...styles.fabButtonStyle }}
        onPress={this.onCreateChildPress.bind(this)}
      >
        {/* <Icon name="add-friend" style={{ color: '#fff' }} /> */}
        <Text style={{ color: '#fff' }}>+ Child</Text>
      </Button>
    );
  }

  getContainerHeight() {
    if (this.props.screen) {
      return this.props.screen.height - 105;
    }
    return 500;
  }

  render() {
    if (this.props.loading) {
      return <ActivityIndicator size="large" style={styles.loadingSpinnerStyle} />;
    }

    return (
      <View style={{ height: this.getContainerHeight() }}>
        <FlatList
          data={this.props.children}
          renderItem={({ item }) =>
            <BasicListItem
              item={item}
              labelKey='name'
              onPress={this.onChildPress.bind(this)}
            />}
          ListEmptyComponent={this.renderEmptyList.bind(this)}
        />
        {this.renderFabButton()}
      </View>
    );
  }
}

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


const mapStateToProps = ({ parent, auth }) => {
  const { children, loading } = parent;
  const { screen } = auth;

  return { children, loading, screen };
};


export default connect(mapStateToProps, { setActiveChild })(Dashboard);
