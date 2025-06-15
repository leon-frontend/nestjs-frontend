import type { JSX } from 'react'

// 单个路由的类型
export interface RouteConfigItem {
  path: string
  element: JSX.Element
  title?: string
  children?: RouteConfigItem[]
}
