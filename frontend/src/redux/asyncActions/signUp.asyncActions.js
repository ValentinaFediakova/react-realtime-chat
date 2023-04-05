/* eslint-disable */

import { request, REGISTRATION_PAGE_PATH } from '../../utils';
import {
  loadingUserStart, loadingUserEnd, loadingUserError, addUser,
} from '../actions/user.action';
import UnregistrationError from '../../errors/UnregistrationError';

export const signUpAsyncActions = ({ username, password }, auth, navigate) => async (dispatch) => {
  try {
    dispatch(loadingUserStart());
    const response = await request({
      method: 'POST',
      url: REGISTRATION_PAGE_PATH,
      data: { username, password },
    });

    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('username', username);
      auth.logIn();
      dispatch(addUser(username));
      dispatch(loadingUserEnd());
      navigate('/', { replace: false });
    }
  } catch (error) {
    if (error.response.status === 409) {
      dispatch(loadingUserError(new UnregistrationError()));
    }
  }
};
