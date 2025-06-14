import { Navigate } from 'react-router-dom'
import Login from '@/views/Login'
import { lazy } from 'react'

// 路由组件懒加载
const Register = lazy(() => import('@/views/Register'))
const Main = lazy(() => import('@/layout/Main'))
const DashBoard = lazy(() => import('@/views/Dashboard'))
const Users = lazy(() => import('@/views/Users'))
const Menus = lazy(() => import('@/views/Menus'))
const Roles = lazy(() => import('@/views/Roles'))

// 路由配置
const routesConfig = [
  {
    path: '/',
    element: <Navigate to="/login" />,
  },
  {
    path: '/login',
    element: <Login />,
    title: '登录',
  },
  {
    path: '/register',
    element: <Register />,
    title: '注册',
  },
  {
    path: '/home',
    element: <Main />,
    title: '首页',
    children: [
      {
        path: '',
        element: <DashBoard />,
        title: 'Dashboard',
      },
      {
        path: 'users',
        element: <Users />,
        title: 'Users',
      },
      {
        path: 'menus',
        element: <Menus />,
        title: 'Menus',
      },
      {
        path: 'roles',
        element: <Roles />,
        title: 'Roles',
      },
    ],
  },
]

export default routesConfig
