import { Button, Pagination, Space, Table, Tag } from 'antd'
import type React from 'react'
import type { RoleItem, UserItem } from '@/api/user/type'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useState } from 'react'

const { Column } = Table

// UsersTable Props 的 TS 类型
interface UsersTableProps {
  dataSource: UserItem[]
  handleAddBtn: () => void // 新增用户按钮
  handleEditBtn: (user: UserItem) => void // 编辑用户按钮
  handleDelBtn: (userId: string) => void // 删除用户按钮
}

const UsersTable: React.FC<UsersTableProps> = ({ dataSource, handleEditBtn }) => {
  // 分页状态可以保留在表格内部，因为它只和表格的展示相关
  const [pagination, setPagination] = useState({ currentPage: 1, pageSize: 5 })

  const startIndex = (pagination.currentPage - 1) * pagination.pageSize
  const paginatedData = dataSource.slice(startIndex, startIndex + pagination.pageSize)

  // 分页改变时的处理函数
  const handlePageChange = (page: number, size: number) => {
    setPagination({ currentPage: page, pageSize: size })
  }

  return (
    <>
      {/* 表格组件 */}
      <Table<UserItem>
        dataSource={paginatedData}
        rowKey="id"
        bordered
        pagination={false}
        scroll={{ y: '70vh' }}
      >
        <Column title="#" key="id" width={80} align="center" render={(_, __, index) => index + 1} />
        <Column title="Name" align="center" dataIndex="username" key="username" />

        {/* 渲染 Gender 列 */}
        <Column
          title="Gender"
          align="center"
          dataIndex={['profile', 'gender']} // 会查找 record.profile.gender 的值
          key="profile-gender"
          render={(gender: number) => {
            return <span>{gender ? '男' : '女'}</span>
          }}
        />

        {/* 渲染 Role 列 */}
        <Column
          title="Roles"
          align="center"
          dataIndex="roles"
          key="roles"
          render={(roles: RoleItem[]) => (
            <>
              {/* 增加一个 ?. 安全调用，防止 roles 为 undefined */}
              {roles?.map((role) => (
                <Tag color="blue" key={role.id}>
                  {role.name}
                </Tag>
              ))}
            </>
          )}
        />

        {/* 渲染 Address 列，嵌套数据 */}
        {/* dataIndex={['profile', 'address']} 会查找 record.profile.address 的值。 */}
        <Column
          title="Address"
          align="center"
          dataIndex={['profile', 'address']}
          key="profile-address"
        />

        {/* 渲染 Action 列 */}
        <Column
          title="Action"
          align="center"
          key="action" // 这个 key 是必需的
          render={(_, record: UserItem) => (
            <Space size="middle">
              <Button icon={<EditOutlined />} type="primary" onClick={() => handleEditBtn(record)}>
                编辑
              </Button>
              <Button icon={<DeleteOutlined />} color="danger" variant="solid">
                删除
              </Button>
            </Space>
          )}
        />
      </Table>

      {/* 分页器组件 */}
      <Pagination
        align="end"
        current={pagination.currentPage}
        pageSize={pagination.pageSize}
        total={dataSource.length} // 总数据量
        onChange={handlePageChange}
        style={{ marginTop: '20px' }}
        hideOnSinglePage
      />
    </>
  )
}

export default UsersTable
