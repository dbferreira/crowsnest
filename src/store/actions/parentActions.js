import firebase from 'firebase';
import {
  FIELD_CHANGED_PARENT,
  SAVE_CHILD,
  SAVE_COMPLETE
} from './../types';

require('firebase/firestore');

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

    db.collection('parents').doc(uid).collection('children').add(child)
      .then((docRef) => {
        console.log('Save complete:', docRef);
        dispatch({ type: SAVE_COMPLETE });
        navigate('ParentDashboard');
      })
      .catch(error => console.log('erorr is', error));
  };
};
