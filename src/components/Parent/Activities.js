import React, { Component } from 'react';
import { View, BackHandler, FlatList, ActivityIndicator, Button, Text } from 'react-native';
import { connect } from 'react-redux';
// import { Button, Icon, Text } from '@shoutem/ui';
import BasicListItem from './BasicListItem';
import { getActivities, setActiveActivity } from '../../store/actions';

class Activities extends Component {
  state = {};

  static navigationOptions = {
    title: 'Activities',
    tabBarIcon: ({ tintColor }) => (
      // <Icon name="restaurant-menu" style={{ color: tintColor }} />
      <Text style={{ color: tintColor }}>=</Text>
    ),
  }

  componentWillMount() {
    this.props.getActivities();
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

  onCreateActivityPress() {
    const { navigate } = this.props.navigation;
    this.props.setActiveActivity({}, navigate);
  }

  onActivityPress(activity) {
    const { navigate } = this.props.navigation;
    this.props.setActiveActivity(activity, navigate);
  }

  renderEmptyList() {
    return (
      <View style={{ alignSelf: 'center' }}>
        <Button
          title="+ Event"
          style={{ ...styles.roundButtonStyle, ...styles.emptyListStyle }}
          onPress={this.onCreateActivityPress.bind(this)}
        >
          <Text>+Event</Text>
          {/* <Icon name="add-event" style={{ color: '#fff' }} /> */}
        </Button>
        <Text>Add Activity</Text>
      </View>
    );
  }

  renderFabButton() {
    if (!this.props.activities.length) {
      return;
    }

    return ( // eslint-disable-line
      <Button
        title="+ Activity"
        style={{ ...styles.roundButtonStyle, ...styles.fabButtonStyle }}
        onPress={this.onCreateActivityPress.bind(this)}
      >
        <Text style={{ color: '#fff' }}>+ Activity</Text>
        {/* <Icon name="add-event" style={{ color: '#fff' }} /> */}
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
          data={this.props.activities}
          renderItem={({ item }) =>
            <BasicListItem
              item={item}
              detailsField='reward'
              labelKey='name'
              onPress={this.onActivityPress.bind(this)}
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
  const { activities, loading } = parent;
  const { screen } = auth;

  return { activities, loading, screen };
};


export default connect(mapStateToProps, { getActivities, setActiveActivity })(Activities);
