import { MESSAGES_ADD, MESSAGE_ADD } from '../actionTypes/messages.actionType';
import { SIGN_OUT } from '../actionTypes/signOut.actionType';

const messages = (state = [], action) => {
  switch (action.type) {
    case MESSAGES_ADD:
      return { ...state, items: [...state.items, ...action.payload] };
    case MESSAGE_ADD:
      return { ...state, items: [...state.items, action.payload] };
    case SIGN_OUT:
      return { items: [] };
    default:
      return state;
  }
};

export default messages;
