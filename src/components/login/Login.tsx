import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterRoute } from '../../pages/routes';
import { Users } from '../models/users';
import { DashboardRoute } from './../../pages/routes';
import Notification from '../../share/notification/Notification';
import Spinner from '../../share/spinner/Spinner';
import Card from '../../components/card/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Partial<Users>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState<{
    message: string
    type: 'success' | 'error' | 'warning' | 'info'
    duration?: number
    dismissible?: boolean
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    if (storedUsername && storedPassword) {
      setUsername(storedUsername);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<Users> = {};
    if (!username) {
      newErrors.username = 'Username is required';
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

  async function loginHandler(event: React.FocusEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/users');
        const users: Users[] = await response.json();
        const user = users.find(
          (u: Users) => u.username === username && u.password === password,
        );
        setLoading(false);
        if (user) {
          if (rememberMe) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
          } else {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
          }
          //   setNotification({ message: 'Login successful!', type: 'success', duration: 3000 });
          navigate(DashboardRoute);
        } else {
          setNotification({
            message: 'User not found. Please register first.',
            type: 'error',
            duration: 5000,
            dismissible: true,
          });
        }
      } catch (error) {
        setLoading(false);
        setNotification({
          message: 'An error occurred. Please try again.',
          type: 'error',
          duration: 5000,
        });
      }
    }
  }

  return (
    <>
      {loading && <Spinner />};
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
          duration={notification.duration}
          dismissible={notification.dismissible}
        />
      )}
      <Card className="card">
        <h3 className="title">Login</h3>
        <form onSubmit={loginHandler}>
          <div className="div">
            <label className="label" htmlFor="username">
              username
            </label>
            <input
              className="input"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p className="error">{errors.username}</p>
            )}
          </div>
          <div className="div">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="input"
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="login-form__password-toggle"
            >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
            {errors.password && (
              <p className="error">{errors.password}</p>
            )}
            {errors.passwordDetails &&
              errors.passwordDetails.map((error, index) => (
                <p key={index} className="error">
                  {error}
                </p>
              ))}
          </div>
          <div>
            <button type="submit" className="btn">
              Login
            </button>
          </div>
          <div className="div checkboxContainer">
            <input
              id="checkbox"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="checkbox" className="checkboxLabel">
              Remember Me
            </label>
          </div>
          <div>
            <p>
              if you dont register before, please first
              <Link className="link" to={RegisterRoute}>
                register
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </>
  )
}

export default Login