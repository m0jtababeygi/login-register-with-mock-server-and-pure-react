import Card from '../card/Card'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { RegisterRoute } from '../../pages/routes'
import { Users } from '../models/users'

// interface LoginModel {
//   username: string
//   password: string
//   passwordDetails: string[]
// }

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Partial<Users>>({})
  const navigate = useNavigate()

  // useEffect(() => {
  //   const storedUsername = localStorage.getItem('username')
  //   const storedPassword = localStorage.getItem('password')
  //   if (storedUsername && storedPassword) {
  //     setUsername(storedUsername)
  //     setPassword(storedPassword)
  //   }
  // }, [])

  const validate = (): boolean => {
    const newErrors: Partial<Users> = {}
    if (!username) {
      newErrors.username = 'Username is required'
    }
    const passwordErrors: string[] = []
    if (!password) {
      newErrors.password = 'Password is required'
    } else {
      if (password.length < 8) {
        passwordErrors.push('Password must be at least 8 characters long.')
      }
      if (!/[a-z]/.test(password)) {
        passwordErrors.push(
          'Password must include at least one lowercase letter.',
        )
      }
      if (!/[A-Z]/.test(password)) {
        passwordErrors.push(
          'Password must include at least one uppercase letter.',
        )
      }
      if (!/\d/.test(password)) {
        passwordErrors.push('Password must include at least one number.')
      }
      if (!/[@$!%*?&]/.test(password)) {
        passwordErrors.push(
          'Password must include at least one special character.',
        )
      }
      if (passwordErrors.length > 0) {
        newErrors.passwordDetails = passwordErrors
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function registerHandler(event: React.FocusEvent<HTMLFormElement>) {
    event.preventDefault()

    const response = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })

    if (response.ok) {
      navigate(RegisterRoute)
    }
  }

  return (
    <Card className="card">
      <h3 className="title">Register</h3>
      <form onSubmit={registerHandler}>
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
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div className="div">
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}
          {errors.passwordDetails &&
            errors.passwordDetails.map((error, index) => (
              <p key={index} className="error">
                {error}
              </p>
            ))}
        </div>
        <div className="div">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="btn">
            Register
          </button>
        </div>
      </form>
    </Card>
  )
}

export default Register
