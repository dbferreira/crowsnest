import {
  FIELD_CHANGED_PARENT,
  SAVE_COMPLETE,
  SAVE_CHILD,
  UPDATE_CHILDREN,
  SET_ACTIVE_CHILD
} from '../types';

const INITIAL_STATE = {
  saving: false,
  loading: true,
  child: {},
  children: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FIELD_CHANGED_PARENT:
      return { ...state, child: { ...state.child, [action.payload.type]: action.payload.value } };
    case SAVE_CHILD:
      return { ...state, saving: true };
    case SAVE_COMPLETE:
      return { ...INITIAL_STATE, saving: false };
    case UPDATE_CHILDREN:
      return { ...state, children: action.payload, loading: false };
    case SET_ACTIVE_CHILD:
      return { ...state, child: action.payload };
    default:
      return state;
  }
};
