import { MESSAGES_ADD, MESSAGE_ADD } from '../actionTypes/messages.actionType';

export const messagesAdd = (payload) => ({ type: MESSAGES_ADD, payload });
export const messageAdd = (payload) => ({ type: MESSAGE_ADD, payload });
// export const messagesRemoveFromState = (payload) => ({type: 'MESSAGES_REMOVE', payload})
