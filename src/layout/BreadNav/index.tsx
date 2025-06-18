import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import routesConfig from '@/router/routes'
import type React from 'react'
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

// 由于 routesConfig 是静态导入的，其派生值可以在模块加载时计算一次，而无需在每次组件渲染或状态变更时重复计算。
const flatRoutes = flattenRoutes(routesConfig)

// 使用 Map 映射路由路由路径和路由标题。Map 构造函数可以接受一个可迭代对象，其中每个元素都是键值对数组。
const routeTitleMap = new Map(flatRoutes.map((route) => [route.path, route.title]))

/**
 * 为给定的 pathname 构建面包屑数组。
 * @param pathname - 来自 useLocation() 的当前 URL 路径。
 * @returns 一个面包屑项目数组。
 */
const buildBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const breadcrumbs: BreadcrumbItem[] = []

  // 如果当前已在首页，则直接返回。
  if (pathname === '/') {
    return breadcrumbs
  }

  // 分割路径并转换为数组，并移除空字符串
  // "/user/profile/settings".split('/').filter(Boolean)
  // split 结果: ['', 'user', 'profile', 'settings']
  // filter 结果: ['user', 'profile', 'settings'] (移除了空字符串 '')
  const pathSegments = pathname.split('/').filter(Boolean)
  let currentPath = ''

  pathSegments.forEach((segment) => {
    currentPath += `/${segment}` // 依次拼接路径
    const title = routeTitleMap.get(currentPath)

    // 仅当在路由表中找到对应的标题时，才添加该面包屑项。
    if (title) {
      breadcrumbs.push({
        title,
        path: currentPath, // currentPath 是路由的完整路径，用于路由跳转
      })
    }
  })
  return breadcrumbs
}

// todo: ------------------- 实现 BreadNav 函数式组件 ---------------------
const BreadNav: React.FC = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // 使用 useMemo 缓存面包屑路径。它仅在 pathname 更改时才会重新计算。
  const breadcrumbItems = useMemo(() => buildBreadcrumbs(pathname), [pathname])

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
