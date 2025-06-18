import { Checkbox, Form, Input, Modal, Radio } from 'antd'
import type { UserItem } from '@/api/user/type'
import { useEffect } from 'react'

interface UsersModalProps {
  isModalOpen: boolean
  editingUser: UserItem | null
  onSubmit: (formValues: UserItem) => Promise<boolean>
  onCancel: () => void
}

// 用于角色多选框的选项
const rolesOptions = [
  { label: '管理员', value: 1 },
  { label: '普通用户', value: 2 },
  { label: '测试用户', value: 3 },
]

// todo ------------------------ UsersModal 函数式组件 ---------------------------
const UsersModal: React.FC<UsersModalProps> = ({
  isModalOpen,
  editingUser,
  onSubmit,
  onCancel,
}) => {
  // 定义收集表单数据的变量
  const [form] = Form.useForm()

  // 添加 useEffect Hook 来处理表单状态
  useEffect(() => {
    // 仅在 Modal 打开时执行逻辑
    if (isModalOpen) {
      if (editingUser) form.setFieldsValue(editingUser) // 编辑模式：用用户信息填充表单
      else form.resetFields() // 新增模式：重置（清空）表单所有字段
    }
  }, [isModalOpen, editingUser, form]) // 依赖项：当这些值变化时，重新执行 effect

  // 点击 Modal 框的提交按钮时触发的回调函数
  const handleModalOk = async () => {
    try {
      const formValues = await form.validateFields() // 验证表单
      console.log('🚀 ~ handleModalOk ~ formValues:', formValues)
      const success = await onSubmit(formValues) // 将表单数据传递给父组件
      if (success) onCancel() // 提交成功后关闭 Modal 框并重置编辑用户数据
    } catch (error) {
      console.log('🚀 ~ handleModalOk ~ error:', error)
    }
  }

  return (
    <Modal
      title={editingUser ? '编辑用户' : '新增用户'}
      open={isModalOpen}
      okText="确定"
      cancelText="取消"
      onOk={handleModalOk}
      onCancel={onCancel} // 执行重置等操作（父组件方法）
    >
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ marginTop: '30px', marginBottom: '30px' }}
      >
        {/* 用户名字段 */}
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        {/* 密码字段 */}
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input type="password" placeholder="请输入密码" />
        </Form.Item>

        {/* 角色字段 */}
        <Form.Item
          label="角色"
          name="roles"
          rules={[{ required: true, message: '请至少选择一个角色!' }]}
        >
          <Checkbox.Group options={rolesOptions} />
        </Form.Item>

        {/* 性别字段 */}
        <Form.Item
          label="性别"
          name={['profile', 'gender']}
          rules={[{ required: true, message: '请选择性别!' }]}
        >
          <Radio.Group>
            <Radio value={1}>男</Radio>
            <Radio value={0}>女</Radio>
          </Radio.Group>
        </Form.Item>

        {/* 图片字段 */}
        <Form.Item label="图片地址" name={['profile', 'photo']}>
          <Input placeholder="请输入地址" />
        </Form.Item>

        {/* 地址字段 */}
        <Form.Item label="地址" name={['profile', 'address']}>
          <Input placeholder="请输入地址" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UsersModal
