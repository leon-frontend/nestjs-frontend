import { Pagination, Table } from 'antd'
import type React from 'react'

interface DataType {
  key: React.Key
  age: number
  address: string
}

const { Column } = Table

// dataSource: 表格数据
const data: DataType[] = [
  {
    key: '1',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
]

const Users: React.FC = () => {
  return (
    <>
      <Table<DataType> dataSource={data} bordered pagination={false}>
        <Column title="Age" dataIndex="age" key="age" />
        <Column title="Address" dataIndex="address" key="address" />
      </Table>
      <Pagination align="end" defaultCurrent={1} total={50} style={{ marginTop: '20px' }} />
    </>
  )
}

export default Users
