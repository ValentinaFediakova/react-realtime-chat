/* eslint-disable */
import * as yup from 'yup';

export const createChannelNameSchema = (channelsNameForValidate) => yup.object().shape({
  channelName: yup
    .string()
    .min(3, 'от 3 до 20 символов')
    .max(20, 'от 3 до 20 символов')
    .required('обязательное поле')
    .notOneOf(channelsNameForValidate, 'Должно быть уникальным'),
});
