import firebase from 'react-native-firebase';
import {
  SAVE_ACTIVITY,
  SAVE_COMPLETE_CHILD,
  UPDATE_CHILDREN,
  SET_ACTIVE_CHILD,
  SET_ACTIVE_ACTIVITY,
  UPDATE_ACTIVITIES,
  FIELD_CHANGED_PARENT_ACTIVITY,
  FIELD_CHANGED_PARENT_CHILD,
  SAVE_COMPLETE_ACTIVITY
} from './../types';

export const inputChangedChild = (payload) => {
  return {
    type: FIELD_CHANGED_PARENT_CHILD,
    payload
  };
};

export const createChild = (child, navigate) => {
  return (dispatch) => {
    dispatch({ type: SAVE_ACTIVITY });
    const db = firebase.firestore();
    console.log('saving child:', child);
    const { uid } = firebase.auth().currentUser;

    // If this does not work, use the following work-around until the issue is fixed upstream:
    // Copy https://gist.githubusercontent.com/mikelehen/444950a35019208f3aaf18d37ab4937c/raw/85ac4cb3108d92163cb8f04fbdddcc88d4081aab/index.js over your node_modules/@firebase/webchannel-wrapper/dist/index.js

    // https://github.com/firebase/firebase-js-sdk/issues/283
    const childrenRef = db.collection('parents').doc(uid).collection('children');

    if (!child.key) {
      childrenRef.add(child);
      // .then(() => {
      dispatch({ type: SAVE_COMPLETE_CHILD });
      navigate('ParentHome');
      // })
      // .catch(error => console.log('create error is', error));
    } else {
      childrenRef.doc(child.key).update(child);
      // .then(() => {
      dispatch({ type: SAVE_COMPLETE_CHILD });
      navigate('ParentHome');
      // })
      // .catch(error => console.log('update error is', error));
    }
  };
};

export const deleteChild = (child, navigate) => {
  return (dispatch) => {
    dispatch({ type: SAVE_ACTIVITY });
    const { uid } = firebase.auth().currentUser;
    firebase.firestore().collection('parents').doc(uid).collection('children')
      .doc(child.key)
      .delete();
    // .then(() => {
    dispatch({ type: SAVE_COMPLETE_CHILD });
    navigate('ParentHome');
    // })
    // .catch(error => console.log('delete error is', error));
  };
};

export const setActiveChild = (child, navigate) => {
  navigate('ParentEditChild');
  return { type: SET_ACTIVE_CHILD, payload: child };
};

export const fetchChildren = () => {
  return new Promise((resolve) => {
    const { uid } = firebase.auth().currentUser;
    firebase.firestore().collection('parents').doc(uid).collection('children')
      .onSnapshot((querySnapshot) => {
        const children = [];
        querySnapshot.forEach(doc => children.push({ ...doc.data(), key: doc.id }));
        resolve(children);
      });
  });
};


// ACTIVITIES

export const inputChangedActivity = (payload) => {
  return {
    type: FIELD_CHANGED_PARENT_ACTIVITY,
    payload
  };
};

export const createActivity = (activity, navigate) => {
  return (dispatch) => {
    dispatch({ type: SAVE_ACTIVITY });
    const db = firebase.firestore();
    console.log('saving activity:', activity);
    const { uid } = firebase.auth().currentUser;
    const activitiesRef = db.collection('parents').doc(uid).collection('activities');

    if (!activity.key) {
      activitiesRef.add(activity);
      dispatch({ type: SAVE_COMPLETE_ACTIVITY });
      navigate('ParentActivities');
    } else {
      activitiesRef.doc(activity.key).update(activity);
      dispatch({ type: SAVE_COMPLETE_ACTIVITY });
      navigate('ParentActivities');
    }
  };
};

export const deleteActivity = (activity, navigate) => {
  return (dispatch) => {
    dispatch({ type: SAVE_ACTIVITY });
    const { uid } = firebase.auth().currentUser;
    firebase.firestore().collection('parents').doc(uid).collection('activities')
      .doc(activity.key)
      .delete();
    dispatch({ type: SAVE_COMPLETE_ACTIVITY });
    navigate('ParentActivities');
  };
};

export const setActiveActivity = (activity, navigate) => {
  navigate('ParentEditActivity');
  return { type: SET_ACTIVE_ACTIVITY, payload: activity };
};

export const getActivities = () => {
  return (dispatch) => {
    const { uid } = firebase.auth().currentUser;
    firebase.firestore().collection('parents').doc(uid).collection('activities')
      .onSnapshot((querySnapshot) => {
        const activities = [];
        querySnapshot.forEach(doc => activities.push({ ...doc.data(), key: doc.id }));
        dispatch({ type: UPDATE_ACTIVITIES, payload: activities });
      });
  };
};

