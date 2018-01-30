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

const parentDashboardTab = TabNavigator({
  ParentDashboard: { screen: ParentDashboard },
  ParentActivities: { screen: ParentActivities }
});

const Router = StackNavigator({
  LoadingScreen: { screen: LoadingScreen },
  Login: { screen: LoginForm },
  ParentHome: {
    screen: parentDashboardTab,
    navigationOptions: {
      headerLeft: null,
      title: 'Crow\'s Nest',
      headerRight: <ParentDashboardHeaderButton />
    }
  },
  ParentEditChild: { screen: ParentEditChild }
}, routerSettings);

export default Router;
