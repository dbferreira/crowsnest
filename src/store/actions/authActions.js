import firebase from 'react-native-firebase';
import { NavigationActions } from 'react-navigation';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  FIELD_CHANGED_AUTH,
  LOGOUT_USER
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
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.info('Auth error: ', error);
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user, navigate))
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
        loginUserSuccess(dispatch, user, navigate);
      } else {
        setTimeout(() => {
          dispatch({ type: LOGOUT_USER });
          navigate('Login');
        }, 500);
      }
    });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user, navigate) => {
  setTimeout(() => {
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: user
    });
    navigate('ParentHome');
  }, 300);
};
