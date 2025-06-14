import { RouterProvider } from 'react-router-dom'
import router from './router'
import { Suspense } from 'react'
import Loading from '@/components/Loading'

function App() {
  return (
    <>
      {/* 懒加载组件 */}
      <Suspense fallback={<Loading />}>
        {/* 使用 RouterProvider 组件将路由配置传递给整个应用使用 */}
        <RouterProvider router={router} />
      </Suspense>
    </>
  )
}

export default App
