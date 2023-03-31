import {
  USER_ADD, USER_DELETE, USER_LOADING_START, USER_LOADING_END, USER_LOADING_ERROR,
} from '../actionTypes/user.actionType';

export const addUser = (payload) => ({ type: USER_ADD, payload });
export const deleteUser = () => ({ type: USER_DELETE });
export const loadingUserStart = () => ({ type: USER_LOADING_START });
export const loadingUserEnd = () => ({ type: USER_LOADING_END });
export const loadingUserError = (payload) => ({ type: USER_LOADING_ERROR, payload });
