/* eslint-disable */

import {
  INIT_DATA_LOADING_START, INIT_DATA_LOADING_SUCCESS, INIT_DATA_LOADING_FAIL, INIT_WEBSOCKET_CONNECT_START, INIT_WEBSOCKET_CONNECT_SUCCESS,
} from '../actionTypes/loading.actionType';
import { SIGN_OUT } from '../actionTypes/signOut.actionType';

const loading = (state = [], action) => {
  let loading;
  switch (action.type) {
    case INIT_DATA_LOADING_START:
      loading = 'true';
      return { ...state, loading };
    case INIT_DATA_LOADING_SUCCESS:
      loading = 'success';
      return { ...state, loading };
    case INIT_DATA_LOADING_FAIL:
      return { ...state, errors: action.payload };
    case INIT_WEBSOCKET_CONNECT_START:
      return { ...state, wsLoading: true };
    case INIT_WEBSOCKET_CONNECT_SUCCESS:
      return { ...state, wsLoading: false };
    case SIGN_OUT:
      return {};
    default:
      return state;
  }
};

export default loading;
