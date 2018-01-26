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

    db.collection('parents').doc().set(child)
      .then((docRef) => {
        console.log('Save complete:', docRef.id);
        dispatch({ type: SAVE_COMPLETE });
        navigate('ParentDashboard');
      })
      .catch(error => console.log('erorr is', error));
  };
};
