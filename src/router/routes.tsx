import { Navigate } from 'react-router-dom'
import Login from '@/views/Login'
import { lazy } from 'react'
import type { RouteConfigItem } from './types'

// 路由组件懒加载
const Register = lazy(() => import('@/views/Register'))
const Main = lazy(() => import('@/layout/Main'))
const DashBoard = lazy(() => import('@/views/Dashboard'))
const Users = lazy(() => import('@/views/Users'))
const Menus = lazy(() => import('@/views/Menus'))
const Roles = lazy(() => import('@/views/Roles'))

// 路由配置
const routesConfig: RouteConfigItem[] = [
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
        title: '控制台',
      },
      {
        path: '/home/users',
        element: <Users />,
        title: '用户管理',
      },
      {
        path: '/home/menus',
        element: <Menus />,
        title: '菜单管理',
      },
      {
        path: '/home/roles',
        element: <Roles />,
        title: '角色管理',
      },
    ],
  },
]

export default routesConfig
