import axios from '@/utils/axios'
import { Button, Card, Checkbox, Flex, Form, Input } from 'antd'
import { useEffect } from 'react'
import AuthSwitchBtn from '@/components/AuthSwitchBtn'
import type React from 'react'
import type { FormProps } from 'antd'

// 表单字段类型
export type FieldType = {
  username?: string
  password?: string
  remember?: string
}

// onFinish 函数会在表单提交成功时调用
const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values)
}

// onFinishFailed 函数会在表单提交失败时调用
const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo)
}

// todo: ------------------- 实现 Login 函数式组件 ---------------------
const Login: React.FC = () => {
  const [formRef] = Form.useForm()
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get('/user')
      console.log(res)
    }

    getUser()
  }, [])

  return (
    <Flex justify="center" align="center" style={{ width: '100vw', height: '100vh' }}>
      <Card
        title="用户登录"
        extra={<AuthSwitchBtn />}
        variant="borderless"
        style={{ width: '40vw' }}
      >
        <Flex justify="center" align="center">
          <Form
            form={formRef}
            name="basic"
            style={{ width: '27vw' }}
            initialValues={{ remember: false }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            {/* 用户名字段 */}
            <Form.Item<FieldType>
              label="用户名"
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
              labelCol={{ span: 3 }}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>

            {/* 密码字段 */}
            <Form.Item<FieldType>
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
              labelCol={{ span: 3 }}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>

            {/* 记住密码字段 */}
            <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <Form.Item label={null}>
              {/* 登录按钮 */}
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
              {/* 充值按钮 */}
              <Button
                htmlType="button"
                onClick={() => formRef.resetFields()}
                block
                style={{ marginTop: '10px' }}
              >
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Card>
    </Flex>
  )
}

export default Login
