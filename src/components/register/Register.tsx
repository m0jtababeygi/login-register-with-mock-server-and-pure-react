import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../UI/card/Card';
import { RegisterRoute } from '../../pages/routes';
import { Users } from '../models/Users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Register.css';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState<Partial<Users>>({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validate = (): boolean => {
    const newErrors: Partial<Users> = {};
    if (!username) {
      newErrors.username = 'Username is required';
    }
    if (!email) {
      newErrors.email = 'Email is required';
    } else {
      if (!emailRegex.test(email)) {
        newErrors.email = 'Email address must be include @';
      }
    } 
    if (!gender) {
      newErrors.gender = 'Gender is required';
      // newErrors.gender = '';
    }
    const passwordErrors: string[] = [];
    if (!password) {
      newErrors.password = 'Password is required';
    } else {
      if (password.length < 8) {
        passwordErrors.push('Password must be at least 8 characters long.');
      }
      if (!/[a-z]/.test(password)) {
        passwordErrors.push(
          'Password must include at least one lowercase letter.',
        );
      }
      if (!/[A-Z]/.test(password)) {
        passwordErrors.push(
          'Password must include at least one uppercase letter.',
        );
      }
      if (!/\d/.test(password)) {
        passwordErrors.push('Password must include at least one number.');
      }
      if (!/[@$!%*?&]/.test(password)) {
        passwordErrors.push(
          'Password must include at least one special character.',
        );
      }
      if (passwordErrors.length > 0) {
        newErrors.passwordDetails = passwordErrors;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function registerHandler(event: React.FocusEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validate()) {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ username, password, email, gender }),
      });

      if (response.ok) {
        navigate(RegisterRoute);
      }
    }
  }

  return (
    <Card className="register__card">
      <h3 className="register__title">Register</h3>
      <form className="register__form" onSubmit={registerHandler}>
        <div className="register__form-group">
          <label className="register__label" htmlFor="username">
            Username
          </label>
          <input
            className="register__input"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p className="register__error">{errors.username}</p>}
        </div>
        <div className="register__form-group">
          <label className="register__label" htmlFor="email">
            Email
          </label>
          <input
            className="register__input"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="register__error">{errors.email}</p>}
        </div>
        <div className="register__form-group">
          <label className="register__label" htmlFor="password">
            Password
          </label>
          <div className="register__password-container">
            <input
              className="register__input"
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="register__password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          {errors.password && <p className="register__error">{errors.password}</p>}
          {errors.passwordDetails &&
            errors.passwordDetails.map((error, index) => (
              <p key={index} className="register__error">
                {error}
              </p>
            ))}
        </div>
        <div className="register__form-group">
          <label className="register__label" htmlFor="gender">
            Gender
          </label>
          <select
            id="gender"
            className="register__select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="" disabled>Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p className="register__error">{errors.gender}</p>}
        </div>
        <div className="register__form-group">
          <button type="submit" className="register__button">
            Register
          </button>
        </div>
      </form>
    </Card>
  );
};

export default Register;
