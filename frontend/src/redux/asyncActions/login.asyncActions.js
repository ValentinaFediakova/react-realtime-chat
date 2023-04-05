/* eslint-disable */

import { request, AUTHORISATION_PAGE_PATH } from '../../utils';
import { loadingUserStart, loadingUserEnd, loadingUserError } from '../actions/user.action';
import UnauthorizedError from '../../errors/UnauthorizedError';

export const loginAsyncAction = ({ username, password }, auth, navigate) => async (dispatch) => {
  try {
    dispatch(loadingUserStart());
    const response = await request({
      method: 'POST',
      url: AUTHORISATION_PAGE_PATH,
      data: { username, password },
    });
    if (response.token) {
      dispatch(loadingUserEnd());
      auth.logIn();
      localStorage.setItem('token', response.token);
      localStorage.setItem('username', username);
      navigate('/', { replace: false });
    }
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(loadingUserError(new UnauthorizedError()));
    }
  }
};
