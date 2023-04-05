/* eslint-disable */

import cn from 'classnames';

import ErrorField from './ErrorField';

import './Input.css';

const Input = ({
  placeholder, type, name, value, onChange, error,
}) => {
  const isError = !!error;
  const classesInput = cn('Input', {
    Input__error: isError,
  });

  return (
    <div className="Input__wrap">
      <input
        placeholder={placeholder}
        type={type}
        name={name}
        id={name}
        value={value}
        className={classesInput}
        onChange={onChange}
      />
      <label for={name}>{placeholder}</label>
      <ErrorField error={error} />
    </div>
  );
};

export default Input;
