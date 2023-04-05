/* eslint-disable */

import { getData } from '../../utils';
import {
  channelsAdd,
} from '../actions/channels.action';
import {
  initDateLoadingFail,
  initDataLoadingStart,
  initDataLoadingSuccess,
} from '../actions/loading.action';
import {
  messagesAdd,
} from '../actions/messages.action';

export const getDataForChannels = () => async (dispatch) => {
  try {
    dispatch(initDataLoadingStart());
    // console.log('start')
    const data = await getData();
    // console.log('data recieved')
    dispatch(channelsAdd(data.channels));
    dispatch(messagesAdd(data.messages));
    dispatch(initDataLoadingSuccess());
  } catch (error) {
    // console.log('data ERROR')
    dispatch(initDateLoadingFail(error));
  }
};
