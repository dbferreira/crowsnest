import firebase from 'react-native-firebase';
import {
  FIELD_CHANGED_PARENT,
  SAVE_CHILD,
  SAVE_COMPLETE,
  UPDATE_CHILDREN,
  SET_ACTIVE_CHILD,
  SET_ACTIVE_ACTIVITY
} from './../types';

export const inputChangedChild = (payload) => {
  return {
    type: FIELD_CHANGED_PARENT,
    payload
  };
};

export const createChild = (child, navigate) => {
  return (dispatch) => {
    dispatch({ type: SAVE_CHILD });
    const db = firebase.firestore();
    console.log('saving child:', child);
    const { uid } = firebase.auth().currentUser;

    // If this does not work, use the following work-around until the issue is fixed upstream:
    // Copy https://gist.githubusercontent.com/mikelehen/444950a35019208f3aaf18d37ab4937c/raw/85ac4cb3108d92163cb8f04fbdddcc88d4081aab/index.js over your node_modules/@firebase/webchannel-wrapper/dist/index.js

    // https://github.com/firebase/firebase-js-sdk/issues/283
    const childrenRef = db.collection('parents').doc(uid).collection('children');
    console.log('child:', child);

    if (!child.key) {
      childrenRef.add(child);
      // .then(() => {
      dispatch({ type: SAVE_COMPLETE });
      navigate('ParentHome');
      // })
      // .catch(error => console.log('create error is', error));
    } else {
      childrenRef.doc(child.key).update(child);
      // .then(() => {
      dispatch({ type: SAVE_COMPLETE });
      navigate('ParentHome');
      // })
      // .catch(error => console.log('update error is', error));
    }
  };
};

export const deleteChild = (child, navigate) => {
  return (dispatch) => {
    dispatch({ type: SAVE_CHILD });
    const { uid } = firebase.auth().currentUser;
    firebase.firestore().collection('parents').doc(uid).collection('children')
      .doc(child.key)
      .delete();
    // .then(() => {
    dispatch({ type: SAVE_COMPLETE });
    navigate('ParentHome');
    // })
    // .catch(error => console.log('delete error is', error));
  };
};

export const getChildren = () => {
  return (dispatch) => {
    const { uid } = firebase.auth().currentUser;
    firebase.firestore().collection('parents').doc(uid).collection('children')
      .onSnapshot((querySnapshot) => {
        const children = [];
        querySnapshot.forEach(doc => children.push({ ...doc.data(), key: doc.id }));
        dispatch({ type: UPDATE_CHILDREN, payload: children });
      });
  };
};

export const setActiveChild = (child, navigate) => {
  navigate('ParentEditChild');
  return { type: SET_ACTIVE_CHILD, payload: child };
};

export const setActiveActivity = (activity, navigate) => {
  navigate('ParentEditActivity');
  return { type: SET_ACTIVE_ACTIVITY, payload: activity };
};
