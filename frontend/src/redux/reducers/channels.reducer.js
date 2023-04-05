/* eslint-disable */

import {
  CHANNELS_ADD,
  CHANNEL_ADD,
  CHANNEL_REMOVE,
  CHANNEL_RENAME,
  CHANNEL_SET_ACTIVE,
  CHANNEL_WILL_REMOVE,
  CHANNEL_WILL_RENAME,
} from '../actionTypes/channels.actionType';
import { SIGN_OUT } from '../actionTypes/signOut.actionType';
import { DEFAULT_CHANNEL } from '../../utils';

const channels = (state = [], action) => {
  switch (action.type) {
    case CHANNELS_ADD:
      return { ...state, items: [...state.items, ...action.payload] };
    case CHANNEL_ADD:
      return { ...state, items: [...state.items, action.payload] };
    case CHANNEL_REMOVE:
      if (action.payload.id === state.currentChannelId) {
        return { ...state, currentChannelId: DEFAULT_CHANNEL, items: state.items.filter(({ id }) => id !== action.payload.id) };
      }
      return { ...state, items: state.items.filter(({ id }) => id !== action.payload.id) };

    case CHANNEL_RENAME:
      const channelWithRenamedOne = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, name: action.payload.name };
        }
        return item;
      });
      return { ...state, items: channelWithRenamedOne };
    case CHANNEL_SET_ACTIVE:
      return { ...state, currentChannelId: action.payload };
    case SIGN_OUT:
      return {
        items: [], currentChannelId: DEFAULT_CHANNEL, channelWillRemove: null, channelWillRename: null,
      };
    case CHANNEL_WILL_REMOVE:
      return { ...state, channelWillRemove: action.payload };
    case CHANNEL_WILL_RENAME:
      return { ...state, channelWillRename: action.payload };
    default:
      return state;
  }
};

export default channels;
