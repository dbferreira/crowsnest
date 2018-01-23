import {
  FIELD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER
} from '../types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false,
  starting: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FIELD_CHANGED:
      return { ...state, [action.payload.type]: action.payload.value };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, starting: false, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', loading: false, starting: false };
    case LOGOUT_USER:
      return { ...INITIAL_STATE, starting: false };
    default:
      return state;
  }
};
