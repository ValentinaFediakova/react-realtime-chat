import {
  INIT_DATA_LOADING_START, INIT_DATA_LOADING_SUCCESS, INIT_DATA_LOADING_FAIL, INIT_WEBSOCKET_CONNECT_START, INIT_WEBSOCKET_CONNECT_SUCCESS,
} from '../actionTypes/loading.actionType';

export const initDataLoadingStart = () => ({ type: INIT_DATA_LOADING_START });
export const initDataLoadingSuccess = () => ({ type: INIT_DATA_LOADING_SUCCESS });
export const initDateLoadingFail = (payload) => ({ type: INIT_DATA_LOADING_FAIL, payload });

export const initWebsocketConnectStart = (payload) => ({ type: INIT_WEBSOCKET_CONNECT_START, payload });
export const initWebsocketConnectSuccess = (payload) => ({ type: INIT_WEBSOCKET_CONNECT_SUCCESS, payload });
