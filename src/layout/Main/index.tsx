import type React from 'react'
import { Outlet } from 'react-router-dom'
import { Breadcrumb, Layout, theme } from 'antd'
import MenuNav from '../MenuNav'

const { Header, Content } = Layout

const layoutStyle: React.CSSProperties = {
  minHeight: '100vh', // 设置最小高度为视口高度
  width: '100%', // 设置宽度为100%
  maxWidth: '100%', // 移除最大宽度限制
}

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
}

const contentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh', // 确保右侧布局占满全屏高度
}

// todo: ------------------- 实现 Main 函数式组件 ---------------------
const Main: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken() // 获取主题色和圆角大小

  return (
    <Layout style={layoutStyle}>
      {/* 左侧菜单栏导航 */}
      <MenuNav />
      <Layout>
        <Header style={headerStyle}>Header</Header>
        <Content style={contentStyle}>
          <Breadcrumb style={{ margin: '16px' }} items={[{ title: 'User' }, { title: 'Bill' }]} />
          <div
            style={{
              margin: '0 16px',
              flex: 1, // 关键：让容器占据剩余空间
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Main
