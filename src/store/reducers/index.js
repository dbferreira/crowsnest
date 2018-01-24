import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import ParentReducer from './parentReducer';

export default combineReducers({
  auth: AuthReducer,
  parent: ParentReducer
});
