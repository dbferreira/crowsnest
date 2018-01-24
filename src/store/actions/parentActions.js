// import firebase from 'firebase';
import {
  FIELD_CHANGED_PARENT
} from './../types';

export const inputChangedChild = (payload) => {
  return {
    type: FIELD_CHANGED_PARENT,
    payload
  };
};

