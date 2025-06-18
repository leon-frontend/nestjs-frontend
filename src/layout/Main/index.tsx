import type React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, theme } from 'antd'
import MenuNav from '../MenuNav'
import BreadNav from '../BreadNav'

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
}

// todo: ------------------- 实现 Main 函数式组件 ---------------------
const Main: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken() // 获取主题色和圆角大小

  // 主要内容区域的容器样式
  const mainContentStyle: React.CSSProperties = {
    margin: '0 16px 16px', // 建议给底部也加上 margin
    padding: 24,
    flex: 1,
    background: colorBgContainer,
    borderRadius: borderRadiusLG,
  }

  return (
    <Layout style={layoutStyle}>
      {/* 左侧菜单栏导航 */}
      <MenuNav />
      <Layout>
        <Header style={headerStyle}>Header</Header>
        <Content style={contentStyle}>
          {/* 面包屑导航 */}
          <BreadNav />
          <div style={mainContentStyle}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Main
