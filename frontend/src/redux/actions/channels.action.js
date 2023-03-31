import {
  CHANNELS_ADD,
  CHANNEL_ADD,
  CHANNEL_REMOVE,
  CHANNEL_RENAME,
  CHANNEL_SET_ACTIVE,
  CHANNEL_WILL_REMOVE,
  CHANNEL_WILL_RENAME,
} from '../actionTypes/channels.actionType';

// добавляет каналы при первой загрузке

export const channelsAdd = (payload) => ({ type: CHANNELS_ADD, payload });
export const channelAdd = (payload) => ({ type: CHANNEL_ADD, payload });
export const channelRemove = (payload) => ({ type: CHANNEL_REMOVE, payload });
export const channelRename = (payload) => ({ type: CHANNEL_RENAME, payload });
export const channelSetActive = (payload) => ({ type: CHANNEL_SET_ACTIVE, payload });
export const channelWillRemove = (payload) => ({ type: CHANNEL_WILL_REMOVE, payload });
export const channelWillRename = (payload) => ({ type: CHANNEL_WILL_RENAME, payload });
