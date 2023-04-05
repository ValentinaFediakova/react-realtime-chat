/* eslint-disable */

import { combineReducers } from 'redux';
import channels from './channels.reducer';
import loading from './loading.reducer';
import messages from './messages.reducer';
// import currentChannelId from  './currentChannel'
import user from './user.reducer';

export const rootReducer = combineReducers({
  channels,
  loading,
  messages,
  user,
});
