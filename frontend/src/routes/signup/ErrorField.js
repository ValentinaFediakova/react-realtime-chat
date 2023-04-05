/* eslint-disable */

import { useTranslation } from 'react-i18next';

import './ErrorField.css';

const ErrorField = ({ error = [] }) => {
  const { t } = useTranslation();

  return (
    <>
      { error.map((item, index) => <p key={index} className="ErrorField">{t(item)}</p>)}
      {console.log('error', error)}
    </>
  );
};

export default ErrorField;
