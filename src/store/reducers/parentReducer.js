import {
  FIELD_CHANGED_PARENT
} from '../types';

const INITIAL_STATE = {
  child: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FIELD_CHANGED_PARENT:
      return { ...state, child: { ...state.child, [action.payload.type]: action.payload.value } };
    default:
      return state;
  }
};
