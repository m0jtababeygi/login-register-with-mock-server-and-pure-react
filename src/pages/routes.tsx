import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Login from '../components/login/Login'
import Register from '../components/register/Register'
import Dashboard from '../components/dashboard/Dashboard'

export const LoginRoute = '/login'
export const RegisterRoute = '/register'
export const DashboardRoute = '/dashboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: LoginRoute,
    element: <Login />,
  },
  {
    path: RegisterRoute,
    element: <Register />,
  },
  {
    path: DashboardRoute,
    element: <Dashboard />,
  },
])

export default router
