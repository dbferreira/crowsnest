import firebase from 'react-native-firebase';
import { NavigationActions } from 'react-navigation';
import { fetchChildren } from './parentActions';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  FIELD_CHANGED_AUTH,
  LOGOUT_USER,
  UPDATE_CHILDREN
} from './../types';

export const inputChangedLogin = (payload) => {
  return {
    type: FIELD_CHANGED_AUTH,
    payload
  };
};

export const loginUser = ({ email, password, navigate }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
      .catch((error) => {
        console.info('Auth error: ', error);
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(user, navigate, dispatch))
          .catch(() => loginUserFail(dispatch));
      });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    firebase.auth().signOut()
      .catch(() => {
        dispatch({ type: LOGOUT_USER });
        NavigationActions.navigate({
          routeName: 'Login'
        });
      });
  };
};

export const autoLogin = ({ navigate }) => {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        loginUserSuccess(user, navigate, dispatch);
      } else {
        // setTimeout(() => {
        dispatch({ type: LOGOUT_USER });
        navigate('Login');
        // }, 500);
      }
    });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (user, navigate, dispatch) => {
  fetchChildren().then((children) => {
    if (children.length) {
      navigate('ProfileSelector');
    } else {
      navigate('ParentHome');
    }
    dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
    dispatch({ type: UPDATE_CHILDREN, payload: children });
  });
};
