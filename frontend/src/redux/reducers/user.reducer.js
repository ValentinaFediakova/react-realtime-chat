import {
  USER_ADD, USER_DELETE, USER_LOADING_START, USER_LOADING_END, USER_LOADING_ERROR,
} from '../actionTypes/user.actionType';
import { SIGN_OUT } from '../actionTypes/signOut.actionType';

const user = (state = {}, action) => {
  switch (action.type) {
    case USER_ADD:
      return { ...state, username: action.payload };
    case USER_DELETE:
      return { ...state, username: null };
    case USER_LOADING_START:
      return { ...state, loading: 'startLoading' };
    case USER_LOADING_END:
      return { ...state, loading: null, error: null };
    case USER_LOADING_ERROR:
      return { ...state, loading: 'error', error: action.payload };
    case SIGN_OUT:
      return { username: null, loading: null, error: null };
    default:
      return state;
  }
};

export default user;
