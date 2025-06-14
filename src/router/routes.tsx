import { Navigate } from 'react-router-dom'
import Login from '@/views/Login'
import { lazy } from 'react'

// 懒加载路由组件
const Register = lazy(() => import('@/views/Register'))

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
]

export default routesConfig
