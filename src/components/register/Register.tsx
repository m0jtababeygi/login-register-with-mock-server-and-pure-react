import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../UI/card/Card';
import { DashboardRoute } from '../../pages/routes';
import { Users } from '../models/Users';
import './Register.css';
import '../UI/input/Input.css';
import Input from '../UI/input/Input';
import Button from '../UI/button/Button';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState<Partial<Users>>({});
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
        navigate(DashboardRoute);
      }
    }
  }

  return (
    <Card className="register">
      <h3 className="register__title">Register</h3>
      <form className="register__form" onSubmit={registerHandler}>
        <Input
          id="username"
          label="username"
          type="text"
          value={username}
          onChange={setUsername}
          error={errors.username}
        />
        <Input
          id="email"
          label="email"
          value={email}
          onChange={setEmail}
          error={errors.email}
        />
        <Input
          id="password"
          label="password"
          type="password"
          value={password}
          onChange={setPassword}
          error={errors.password}
          passwordDetails={errors.passwordDetails}
        />
        <div className="input">
          <label className="input__label" htmlFor="gender">
            Gender
          </label>
          <select
            id="gender"
            className="register__select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {errors.gender && <p className="register__error">{errors.gender}</p>}
        </div>
        <Button type="submit">Register</Button>
      </form>
    </Card>
  );
};

export default Register
