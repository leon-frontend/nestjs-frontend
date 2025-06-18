import { useCallback, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { HomeOutlined, MenuOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import type React from 'react'

const { Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]
const getMenuItem = (
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

// dataSource: 菜单项的数据。将路由路径作为菜单项的 Key
const menuItems: MenuItem[] = [
  getMenuItem('首页', '/home', <HomeOutlined />),
  getMenuItem('用户管理', '/home/users', <UserOutlined />),
  getMenuItem('角色管理', '/home/roles', <TeamOutlined />),
  getMenuItem('菜单管理', '/home/menus', <MenuOutlined />),
]

// todo: ------------------- 实现 MenuNav 函数式组件 ---------------------
const MenuNav: React.FC = () => {
  // 路由相关的 hooks
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // 定义 state 状态
  const [collapsed, setCollapsed] = useState<boolean>(false) // 控制菜单的展开和收起

  // 点击菜单项时，实现路由跳转
  const handleMenuClick = useCallback<NonNullable<MenuProps['onClick']>>(
    (item) => {
      navigate(item.key)
    },
    [navigate]
  )

  return (
    <Sider
      width="15%"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        style={{
          fontSize: '22px',
          color: 'white',
          height: '64px',
          textAlign: 'center',
          lineHeight: '64px',
          overflow: 'hidden',
        }}
      >
        {collapsed ? '系统' : '后台管理系统'}
      </div>
      <Menu
        theme="dark"
        // 使用 selectedKeys 而不是 defaultSelectedKeys。使用 pathname 控制菜单项高亮
        selectedKeys={[pathname]}
        mode="inline"
        items={menuItems}
        onClick={handleMenuClick}
      />
    </Sider>
  )
}

export default MenuNav
