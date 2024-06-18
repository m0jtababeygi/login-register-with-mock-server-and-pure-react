import React  from 'react';
import {InputProps} from '../../models/InputProps';

const Input: React.FC<InputProps> = ({ id, label, type, value, onChange, error }) => {
    return(
        <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input
          className="form-input"
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
      </div>
    )
}

export default Input;