import { Spin } from 'antd'
import type React from 'react'

// 创建一个加载组件
const Loading: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
      }}
    >
      <Spin size="large" />
    </div>
  )
}

export default Loading
