import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import socketMiddleware from './middleware/websockets.middleware';
import { notificationMiddleware } from './middleware/notification.middleware';
import { filterBadWordsMiddleware } from './middleware/filterBadWords.middleware';

import { rootReducer } from './reducers/index';

const middlewares = [thunk, socketMiddleware(), notificationMiddleware(), filterBadWordsMiddleware()];

const initialState = {
  channels: {
    items: [],
    currentChannelId: 1,
    channelWillRemove: null,
    channelWillRename: null,
  },
  messages: {
    items: [],
  },
  errors: '',
  loading: {},
  user: {
    username: null,
    loading: null,
    error: null,
  },

};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)));
