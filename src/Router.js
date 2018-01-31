import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import ParentDashboard from './components/Parent/Dashboard';
import ParentDashboardHeaderButton from './components/Parent/DashboardHeaderButton';
import ParentActivities from './components/Parent/Activities';
import ParentEditChild from './components/Parent/EditChild';
import LoginForm from './components/Auth/LoginForm';
import LoadingScreen from './components/Auth/LoadingScreen';

const routerSettings = {
  initialRouteName: 'LoadingScreen',
  animationEnabled: false,
  lazy: true,
  // headerMode: 'none',
  transitionConfig: () => ({ // This will remove animations, but make navigtion a lot faster
    transitionSpec: {
      duration: 0,
    }
  })
};

const TabBarOptions = {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#555555',
    inactiveTintColor: '#aaaaaa',
    showLabel: false,
    showIcon: true,
    tabStyle: {
    },
    indicatorStyle: {
      backgroundColor: '#3498db'
    },
    style: {
      backgroundColor: 'white',
      borderTopWidth: 1,
      borderTopColor: '#cccccc'
    },
  },
};

const parentDashboardTab = TabNavigator({
  ParentDashboard: { screen: ParentDashboard },
  ParentActivities: { screen: ParentActivities }
}, TabBarOptions);

// https://reactnavigation.org/docs/navigators/tab

const Router = StackNavigator({
  LoadingScreen: { screen: LoadingScreen },
  Login: { screen: LoginForm },
  ParentHome: {
    screen: parentDashboardTab,
    navigationOptions: {
      headerLeft: null,
      headerRight: <ParentDashboardHeaderButton />
    }
  },
  ParentEditChild: { screen: ParentEditChild }
}, routerSettings);

export default Router;
