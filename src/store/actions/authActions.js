import firebase from 'firebase';
// import { Actions } from 'react-native-router-flux';
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
      .then(user => loginUserSuccess(dispatch, user, navigate))
      .catch((error) => {
        console.info('Auth error: ', error);
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user, navigate))
          .catch(() => loginUserFail(dispatch));
      });
  };
};

export const autoLogin = ({ navigate }) => {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        loginUserSuccess(dispatch, user, navigate);
      } else {
        logoutUser(dispatch, user, navigate);
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
    navigate('ParentDashboard');
  }, 300);
};

const logoutUser = (dispatch, user, navigate) => {
  setTimeout(() => {
    dispatch({
      type: LOGOUT_USER,
      payload: user
    });
    navigate('Login');
  }, 500);
};

