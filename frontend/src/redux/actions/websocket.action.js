import {
  WS_CONNECT, WS_SEND_MESSAGE, WS_ADD_CHANNEL, WS_REMOVE_CHANNEL, WS_RENAME_CHANNEL,
} from '../actionTypes/websokets.actionType';

export const wsConnect = () => ({ type: WS_CONNECT });
export const wsSendMessage = (payload) => ({ type: WS_SEND_MESSAGE, payload });
export const wsAddChannel = (payload) => ({ type: WS_ADD_CHANNEL, payload });
export const wsRemoveChannel = (payload) => ({ type: WS_REMOVE_CHANNEL, payload });
export const wsRenameChannel = (payload) => ({ type: WS_RENAME_CHANNEL, payload });
