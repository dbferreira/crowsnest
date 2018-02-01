import {
  FIELD_CHANGED_PARENT_CHILD,
  SAVE_COMPLETE_CHILD,
  SAVE_CHILD,
  UPDATE_CHILDREN,
  SET_ACTIVE_CHILD,
  SET_ACTIVE_ACTIVITY,
  FIELD_CHANGED_PARENT_ACTIVITY,
  SAVE_ACTIVITY,
  SAVE_COMPLETE_ACTIVITY,
  UPDATE_ACTIVITIES
} from '../types';

const INITIAL_STATE = {
  saving: false,
  loading: true,
  child: {},
  children: [],
  activity: {},
  activities: [],
};

const sortString = (a, b, field) => {
  const sA = a[field].toUpperCase();
  const sB = b[field].toUpperCase();
  if (sA < sB) {
    return -1;
  }
  if (sA > sB) {
    return 1;
  }

  return 0;
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Children
    case FIELD_CHANGED_PARENT_CHILD:
      return { ...state, child: { ...state.child, [action.payload.type]: action.payload.value } };
    case SAVE_CHILD:
      return { ...state, saving: true };
    case SAVE_COMPLETE_CHILD:
      return { ...INITIAL_STATE, saving: false };
    case UPDATE_CHILDREN:
      return { ...state, children: action.payload.sort((a, b) => sortString(a, b, 'name')), loading: false };
    case SET_ACTIVE_CHILD:
      return { ...state, child: action.payload };

    // Activities
    case FIELD_CHANGED_PARENT_ACTIVITY:
      return { ...state, activity: { ...state.activity, [action.payload.type]: action.payload.value } };
    case SAVE_ACTIVITY:
      return { ...state, saving: true };
    case SAVE_COMPLETE_ACTIVITY:
      return { ...INITIAL_STATE, saving: false };
    case UPDATE_ACTIVITIES:
      return { ...state, activities: action.payload.sort((a, b) => sortString(a, b, 'name')), loading: false };
    case SET_ACTIVE_ACTIVITY:
      return { ...state, activity: action.payload };
    default:
      return state;
  }
};
