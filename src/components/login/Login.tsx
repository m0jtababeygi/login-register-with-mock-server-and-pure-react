import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../UI/card/Card';
import { RegisterRoute } from '../../pages/routes';
import { Users } from '../models/Users';
import { DashboardRoute } from './../../pages/routes';
import Notification from '../../share/notification/Notification';
import Spinner from '../../share/spinner/Spinner';
import './Login.css';
import Input from '../UI/input/Input';
import Button from '../UI/button/Button';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Partial<Users>>({});
  const [loading, setLoading] = useState(false);
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
        const user = await users.find(
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
      {loading && (
        <div className="backdrop">
          <Spinner />
        </div>
      )};
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
          duration={notification.duration}
          dismissible={notification.dismissible}
        />
      )}
      <Card className="login__card">
        <h3 className="login__title">Login</h3>
        <form className="login__form" onSubmit={loginHandler}>
          <Input
            id="username"
            label="username"
            type="text"
            value={username}
            onChange={setUsername}
            error={errors.username}
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
          <Button type="submit">
            Login
          </Button>
          <div className="login__form-group login__form-group--checkbox">
            <input
              className="login__checkbox"
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe" className="login__checkbox-label">
              Remember Me
            </label>
          </div>
          <div className="login__form-group">
            <p className="login__text">
              If you don't have an account, please{' '}
              <Link className="login__link" to={RegisterRoute}>
                register
              </Link>
              .
            </p>
          </div>
        </form>
      </Card>
    </>
  )
}

export default Login
