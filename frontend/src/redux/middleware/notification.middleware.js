/* eslint-disable */

import { CHANNEL_REMOVE, CHANNEL_RENAME, CHANNEL_ADD } from '../actionTypes/channels.actionType';
import { notifySomethingNew } from '../../utils';

export const notificationMiddleware = () => (store) => (next) => (action) => {
  switch (action.type) {
    case CHANNEL_REMOVE:
      if (action.payload.id === store.getState().channels.channelWillRemove.idChannel) {
        notifySomethingNew('notify.notifyDeletChannel');
      }
      next(action);
      break;
    case CHANNEL_RENAME:
      if (action.payload.id === store.getState().channels.channelWillRename.idChannel) {
        notifySomethingNew('notify.notifyChangeChannel');
      }
      next(action);
      break;
    case CHANNEL_ADD:
      if (action.payload.creator === store.getState().user.username) {
        notifySomethingNew('notify.notifyCreateChannel');
      }
      next(action);
      break;
    default:
      return next(action);
  }
};
