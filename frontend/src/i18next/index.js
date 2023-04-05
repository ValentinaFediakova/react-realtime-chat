/* eslint-disable */

import i18n from 'i18next';
// import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { resources } from './locales/index';
import { DEFAULT_LANGUAGES } from '../utils';

export default () => i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: DEFAULT_LANGUAGES,

    interpolation: {
      escapeValue: false,
    },
  });
