// import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Breadcrumb } from 'antd'
// import routesConfig from '@/router/routes'
import type React from 'react'
import { useMemo } from 'react'
import routesConfig from '@/router/routes'
import type { RouteConfigItem } from '@/router/types'

// 单个扁平化路由的类型，使用 Omit 删除 children 属性，返回一个没有 children 属性的对象
type FlatRouteItem = Omit<RouteConfigItem, 'children'>

// 单个面包屑元素的 TS 类型
interface BreadcrumbItem {
  title: string
  path: string
}

// todo: 扁平化路由配置，flatMap = map + flat(1)，先映射再展开，返回的数组会被自动展开一层
const flattenRoutes = (routes: RouteConfigItem[]): FlatRouteItem[] =>
  routes.flatMap(({ children, ...route }) => [route, ...(children ? flattenRoutes(children) : [])])

// todo: 构建面包屑路径
const buildBreadcrumbs = (pathname: string, flatRoutes: FlatRouteItem[]): BreadcrumbItem[] => {
  // 如果是首页，直接返回
  if (pathname === '/' || pathname === '') {
    return [{ title: '首页', path: '/' }]
  }

  const items: BreadcrumbItem[] = []

  // 使用 Map 映射路由路由路径和路由标题。Map 构造函数可以接受一个可迭代对象，其中每个元素都是键值对数组。
  const routeMap = new Map(flatRoutes.map((route) => [route.path, route.title]))

  // 分割路径并转换为数组，并移除空字符串
  // "/user/profile/settings".split('/').filter(Boolean)
  // split 结果: ['', 'user', 'profile', 'settings']
  // filter 结果: ['user', 'profile', 'settings'] (移除了空字符串 '')
  const segments = pathname.split('/').filter(Boolean)
  console.log('segments: ', segments)
  let currentPath = ''

  segments.forEach((segment) => {
    currentPath += `/${segment}` // 依次拼接路径
    const routeTitle = routeMap.get(currentPath)

    items.push({
      title: routeTitle || segment,
      path: currentPath, // currentPath 是路由的完整路径，用于路由跳转
    })
  })

  return [...items]
}

// todo: ------------------- 实现 BreadNav 函数式组件 ---------------------
const BreadNav: React.FC = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // 扁平化路由并构建面包屑
  const breadcrumbItems = useMemo(() => {
    const flatRoutes = flattenRoutes(routesConfig)
    return buildBreadcrumbs(pathname, flatRoutes)
  }, [pathname])

  // 转换为 Ant Design 格式
  const antdItems = breadcrumbItems.map((item, index) => {
    // 判断当前遍历的元素是否是最后一个元素
    const isLast = index === breadcrumbItems.length - 1

    return {
      title: isLast ? (
        item.title // 如果是最后一个节点，则显示标题，不渲染跳转链接
      ) : (
        <span style={{ cursor: 'pointer', color: '#1890ff' }} onClick={() => navigate(item.path)}>
          {item.title}
        </span>
      ),
    }
  })

  return <Breadcrumb style={{ margin: '16px' }} separator=">" items={antdItems} />
}

export default BreadNav
