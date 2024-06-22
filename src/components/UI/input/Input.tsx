import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { InputProps } from '../../models/InputProps';
import './Input.css';

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  error,
  passwordDetails,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="input">
      <label className="input__label" htmlFor={id}>
        {label}
      </label>
      <div
        className={`input__container ${
          isPassword ? 'input__container--password' : ''
        }`}
      >
        <input
          className="input__field"
          id={id}
          type={isPassword && showPassword ? 'text' : type}
          value={value}
          onChange={(e) => (onChange ? onChange(e.target.value) : undefined)}
        />
        {isPassword && (
          <button
            type="button"
            className="input__toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        )}
      </div>
      {error && <p className="input__error">{error}</p>}
      {passwordDetails &&
        passwordDetails.map((error, index) => (
          <p key={index} className="input__error">
            {error}
          </p>
        ))}
    </div>
  );
};

export default Input;
