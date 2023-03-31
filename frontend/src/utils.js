import axios from 'axios';
import { async } from 'regenerator-runtime';
import { toast, Slide } from 'react-toastify';
import { t } from 'i18next';

const filter = require('leo-profanity');

export const href = process.env.NODE_ENV === 'development' ? 'http://localhost:5001' : 'http://localhost:5001';
export const SOKET_URI = 'ws://localhost:5001';
export const DEFAULT_CHANNEL = 1;
export const AUTHORISATION_PAGE_PATH = 'login';
export const REGISTRATION_PAGE_PATH = 'signup';
export const DEFAULT_LANGUAGES = 'ru';
const LANGUAGES_FOR_CHECKING_BAD_WORDS = {
  en: 'en',
  ru: 'ru',
  fr: 'fr',
};

export const cleanBadWords = (words) => {
  const languages = Object.entries(LANGUAGES_FOR_CHECKING_BAD_WORDS);
  let willCleaned = words;
  for (const [, value] of languages) {
    filter.loadDictionary(value);
    const cleaned = filter.clean(willCleaned, '*', 0);
    willCleaned = cleaned;
  }

  const result = willCleaned;
  return result;
};

const getUrl = (url) => `${href}${url}`;

const notifyError = (text) => toast.error(`🦄 ${t(text)}`, {
  position: 'top-right',
  autoClose: 700,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
  transition: Slide,
});

export const notifySomethingNew = (text) => toast.success(`🦄 ${t(text)}`, {
  position: 'top-right',
  autoClose: 600,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
});

export const postRequest = (data, pagePath) => {
  console.log('POST data', data);
  const urlPost = getUrl(`/api/v1/${pagePath}`);
  return axios.post(urlPost, data).catch((error) => { throw error; });
};

export const request = async ({ method, url, data }) => {
  try {
    const result = await axios({
      method,
      url: getUrl(`/api/v1/${url}`),
      data,
    });
    return result.data;
  } catch (error) {
    console.log('request func error', error);
    if (error.code === 'ERR_NETWORK') {
      notifyError('notify.notifyErrorErrorNetwork');
    }

    if (error.response.status >= 500) {
      notifyError('notify.notifyServerError');
    }

    throw error;
  }
};

export const getData = async () => {
  const urlGet = getUrl('/api/v1/data');
  const token = localStorage.getItem('token');
  const response = await axios.get(urlGet, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};
