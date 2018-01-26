import {
  FIELD_CHANGED_PARENT,
  SAVE_COMPLETE,
  SAVE_CHILD
} from '../types';

const INITIAL_STATE = {
  child: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FIELD_CHANGED_PARENT:
      return { ...state, child: { ...state.child, [action.payload.type]: action.payload.value } };
    case SAVE_CHILD:
      return { ...state, saving: true };
    case SAVE_COMPLETE:
      return { ...INITIAL_STATE, saving: false };
    default:
      return state;
  }
};
