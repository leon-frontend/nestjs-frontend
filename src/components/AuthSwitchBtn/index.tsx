import React from 'react'
import { Button } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import type { ButtonColorType, ButtonVariantType } from 'antd/es/button'

interface AuthSwitchBtnProps {
  text?: string
  color?: ButtonColorType
  variant?: ButtonVariantType
}

// todo: ---------------- 认证页面切换按钮组件 --------------------
const AuthSwitchBtn: React.FC<AuthSwitchBtnProps> = ({
  text,
  color = 'pink',
  variant = 'solid',
}) => {
  const navigate = useNavigate()
  const location = useLocation()

  // 根据当前路径判断跳转目标和默认文本
  const isLoginPage = location.pathname === '/login'
  const targetPath = isLoginPage ? '/register' : '/login'
  const defaultText = isLoginPage ? '去注册' : '去登录'

  return (
    <Button color={color} variant={variant} onClick={() => navigate(targetPath)}>
      {text || defaultText}
    </Button>
  )
}

export default AuthSwitchBtn
