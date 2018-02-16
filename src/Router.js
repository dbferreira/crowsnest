import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import ParentDashboard from './components/Parent/Dashboard';
import ParentDashboardHeaderButton from './components/Parent/DashboardHeaderButton';
import ParentActivities from './components/Parent/Activities';
import ParentEditChild from './components/Parent/EditChild';
import ParentEditActivity from './components/Parent/EditActivity';
import LoginForm from './components/Auth/LoginForm';
import LoadingScreen from './components/Auth/LoadingScreen';
import ProfileSelector from './components/Auth/ProfileSelector';
import ChildMain from './components/Child/Main';
import ChildTimer from './components/Child/Timer';
import ChildActivities from './components/Child/Activities';

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
    activeTintColor: '#3498db',
    inactiveTintColor: '#aaaaaa',
    showLabel: false,
    showIcon: true,
    tabStyle: {
    },
    indicatorStyle: {
      backgroundColor: '#3498db00'
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
  // Auth
  LoadingScreen: { screen: LoadingScreen },
  Login: { screen: LoginForm },
  ProfileSelector: { screen: ProfileSelector },

  // Parent
  ParentHome: {
    screen: parentDashboardTab,
    navigationOptions: {
      headerLeft: null,
      headerRight: <ParentDashboardHeaderButton />
    }
  },
  ParentEditChild: { screen: ParentEditChild },
  ParentEditActivity: { screen: ParentEditActivity },

  // Child
  ChildHome: { screen: ChildMain },
  ChildTimer: { screen: ChildTimer },
  ChildActivities: { screen: ChildActivities }
}, routerSettings);

export default Router;
