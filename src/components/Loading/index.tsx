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
      <div>加载中...</div>
    </div>
  )
}

export default Loading
