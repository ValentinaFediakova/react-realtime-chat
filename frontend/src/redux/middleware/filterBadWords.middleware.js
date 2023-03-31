import { MESSAGE_ADD, MESSAGES_ADD } from '../actionTypes/messages.actionType';
import { CHANNEL_ADD, CHANNELS_ADD, CHANNEL_RENAME } from '../actionTypes/channels.actionType';
import { cleanBadWords } from '../../utils';

export const filterBadWordsMiddleware = () => (store) => (next) => (action) => {
  switch (action.type) {
    case MESSAGE_ADD:
      const { message } = action.payload;
      const cleanMessage = cleanBadWords(message);
      const newMessageAction = { ...action, payload: { ...action.payload, message: cleanMessage } };
      next(newMessageAction);
      break;
    case MESSAGES_ADD:
      const newMessagesActionPayload = action.payload.map((item) => ({ ...item, message: cleanBadWords(item.message) }));
      const newMessagesAction = { ...action, payload: newMessagesActionPayload };
      next(newMessagesAction);
      break;
    case CHANNEL_ADD:
      const channelName = action.payload.name;
      const cleanChannel = cleanBadWords(channelName);
      const newChannelAction = { ...action, payload: { ...action.payload, name: cleanChannel } };
      next(newChannelAction);
      break;
    case CHANNELS_ADD:
      const newChannelsActionPayload = action.payload.map((item) => ({ ...item, name: cleanBadWords(item.name) }));
      const newChannelsAction = { ...action, payload: newChannelsActionPayload };
      next(newChannelsAction);
      break;
    case CHANNEL_RENAME:
      const renamedChannelName = action.payload.name;
      const cleanRenamedChannelName = cleanBadWords(renamedChannelName);
      const newRenamedChannelAction = { ...action, payload: { ...action.payload, name: cleanRenamedChannelName } };
      next(newRenamedChannelAction);
      break;
    default:
      return next(action);
  }
};
