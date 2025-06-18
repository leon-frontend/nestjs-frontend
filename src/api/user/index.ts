import request from '@/utils/request'
import type { UserItem } from './type'

// 定义和用户相关的 API 地址。使用 const 对象和 as const 断言来替代 enum
const API = {
  USER_URL: '/user',
} as const

// 获取所有用户数据
export const reqGetAllUsers = () => request.get<null, UserItem[]>(API.USER_URL)

// 新增单个用户
export const reqAddUser = (user: UserItem) => request.post<UserItem, UserItem>(API.USER_URL, user)

// 更新单个用户
export const reqUpdateUser = (user: UserItem) =>
  request.patch<UserItem, UserItem>(API.USER_URL, user)
