import { io } from 'socket.io-client';
import { SOKET_URI } from '../../utils';
import {
  channelAdd, channelSetActive, channelRemove, channelRename, channelWillRemove, channelWillRename,
} from '../actions/channels.action';

import {
  WS_CONNECT, WS_SEND_MESSAGE, WS_ADD_CHANNEL, WS_REMOVE_CHANNEL, WS_RENAME_CHANNEL,
} from '../actionTypes/websokets.actionType';
import { messageAdd } from '../actions/messages.action';
import { initWebsocketConnectStart, initWebsocketConnectSuccess } from '../actions/loading.action';

const socketMiddleware = () => {
  let socket = null;

  return (store) => (next) => (action) => {
    switch (action.type) {
      case WS_CONNECT:
        if (socket !== null) {
          socket.close();
        }
        store.dispatch(initWebsocketConnectStart());
        socket = io(SOKET_URI);

        socket.on('connect', () => {
          store.dispatch(initWebsocketConnectSuccess());
        });
        socket.on('newMessage', (event) => {
          store.dispatch(messageAdd(event));
        });
        socket.on('newChannel', (event) => {
          store.dispatch(channelAdd(event));
          if (event.creator === store.getState().user.username) {
            store.dispatch(channelSetActive(event.id));
          }
        });
        socket.on('removeChannel', (event) => {
          store.dispatch(channelRemove(event));
        });
        socket.on('renameChannel', (event) => {
          store.dispatch(channelRename(event));
        });
        // socket.on("connect_error", (error) => {
        //   console.log('error', error)
        // });

        break;
      case WS_SEND_MESSAGE:
        const dataSendedMessage = { ...action.payload, channelId: store.getState().channels.currentChannelId, username: store.getState().user.username };
        socket.emit('newMessage', dataSendedMessage);
        break;
      case WS_ADD_CHANNEL:
        socket.emit('newChannel', action.payload);
        break;
      case WS_REMOVE_CHANNEL:
        const idNum = action.payload;
        socket.emit('removeChannel', { id: idNum });
        store.dispatch(channelWillRemove({ idChannel: idNum }));
        break;
      case WS_RENAME_CHANNEL:
        socket.emit('renameChannel', action.payload);
        store.dispatch(channelWillRename({ idChannel: action.payload.id }));
        break;
      default:
        return next(action);
    }
  };
};

export default socketMiddleware;
