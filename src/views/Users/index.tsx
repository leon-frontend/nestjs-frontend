import './index.css'
import { useCallback, useEffect, useState } from 'react'
import { Button } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import UsersTable from './components/UsersTable'
import UsersModal from './components/UsersModal'
import { reqAddUser, reqGetAllUsers } from '@/api/user'
import type React from 'react'
import type { UserItem } from '@/api/user/type'

// todo ------------------------ Users 函数式组件 ---------------------------
const Users: React.FC = () => {
  // todo 处理表格相关的业务逻辑
  const [tableData, setTableData] = useState<UserItem[]>([])

  // 获取所有用户数据
  const fetchAllUsers = useCallback(async () => {
    try {
      const res = await reqGetAllUsers()
      setTableData(res || [])
    } catch {
      console.log('获取用户列表失败')
    }
  }, [])

  useEffect(() => {
    fetchAllUsers()
  }, [fetchAllUsers])

  // 删除用户按钮点击事件
  const handleDelBtn = (userId: string) => {
    console.log('🚀 ~ handleDelBtn ~ userId:', userId)
  }

  // todo 处理 "新增" 和 "编辑" 用户的业务逻辑
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [editingUser, setEditingUser] = useState<UserItem | null>(null) // 保存当前正在编辑的用户信息

  // 点击 "新增用户" 按钮时触发
  const handleAddBtn = () => setModalOpen(true)

  // 点击 "编辑" 按钮时触发
  const handleEditBtn = (user: UserItem) => {
    setEditingUser(user) // 设置正在编辑的用户信息，更新 editingUser 状态
    setModalOpen(true)
  }

  // 该函数会在点击 Modal 框的提交按钮时触发，也可实现子串父数据(传递表单数据)
  const handleModalSubmit = async (formValues: UserItem) => {
    console.log('🚀 ~ handleModalSubmit ~ formValues:', formValues)
    if (editingUser) {
      // 若 editingUser 存在，则是编辑(更新)操作
      console.log('Edit Operation')
    } else {
      // 若 editingUser 不存在，则是新增操作
      const res = await reqAddUser(formValues)
      console.log('🚀 ~ handleModalSubmit ~ res:', res)
    }

    setModalOpen(false) // 关闭 Modal 框
    fetchAllUsers() // 获取更新后的所有用户数据

    return true
  }

  // 隐藏 Modal 框时触发
  const handleModalCancel = () => {
    setEditingUser(null) // 重置编辑用户数据
    setModalOpen(false) // 关闭 Modal 框
  }

  return (
    <>
      {/* "新增用户" 按钮 */}
      <Button
        size="middle"
        color="purple"
        variant="solid"
        icon={<UserAddOutlined />}
        style={{ marginBottom: '10px' }}
        onClick={handleAddBtn}
      >
        新增用户
      </Button>

      {/* 表格组件 */}
      <UsersTable
        dataSource={tableData}
        handleAddBtn={handleAddBtn}
        handleEditBtn={handleEditBtn}
        handleDelBtn={handleDelBtn}
      />

      {/* 新增用户和编辑用户的 Modal 框组件 */}
      <UsersModal
        isModalOpen={isModalOpen}
        editingUser={editingUser}
        onCancel={handleModalCancel}
        onSubmit={handleModalSubmit}
      />
    </>
  )
}

export default Users
