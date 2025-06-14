import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { DesktopOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import type React from 'react'

const { Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]
const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

// 菜单项的数据
const menuItems: MenuItem[] = [
  getItem('首页', '/home', <PieChartOutlined />),
  getItem('用户管理', '/home/users', <DesktopOutlined />),
  getItem('角色管理', '/home/roles', <UserOutlined />),
  getItem('菜单管理', '/home/menus', <TeamOutlined />),
]

// todo: ------------------- 实现 MenuNav 函数式组件 ---------------------
const MenuNav: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  return (
    <Sider
      width="15%"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div style={{ color: 'white', height: '64px', textAlign: 'center', lineHeight: '64px' }}>
        后台管理系统
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="inline"
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  )
}

export default MenuNav
