import { StackNavigator } from 'react-navigation';
import Home from './App';
import ParentDashboard from './components/Parent/Dashboard';
import ParentActivities from './components/Parent/Activities';
import LoginForm from './components/Auth/LoginForm';

const Router = StackNavigator({
  Home: { screen: Home },
  Login: { screen: LoginForm },
  ParentDashboard: { screen: ParentDashboard },
  ParentActivities: { screen: ParentActivities }
});

export default Router;
