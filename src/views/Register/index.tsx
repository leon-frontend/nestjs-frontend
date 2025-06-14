import { Button, Card, Checkbox, Flex, Form, Input } from 'antd'
import AuthSwitchBtn from '@/components/AuthSwitchBtn'
import type React from 'react'
import type { FormProps } from 'antd'
import type { Rule } from 'antd/es/form'
import { useCallback } from 'react'

// 表单字段类型
export type FormFieldsType = {
  username: string
  password: string
  confirmPwd: string
  remember?: string
}

// onFinish 函数会在表单提交成功时调用
const onFinish: FormProps<FormFieldsType>['onFinish'] = (values) => {
  console.log('Success:', values)
}

// onFinishFailed 函数会在表单提交失败时调用
const onFinishFailed: FormProps<FormFieldsType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo)
}

// 表单验证规则
const FORM_RULES = {
  username: [
    { required: true, message: '请输入用户名!' },
    { min: 3, message: '用户名至少3个字符!' },
    { max: 20, message: '用户名不能超过20个字符!' },
    {
      pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
      message: '用户名只能包含字母、数字、下划线和中文!',
    },
  ],
  password: [
    { required: true, message: '请输入密码!' },
    { min: 6, message: '密码至少6个字符!' },
    { max: 20, message: '密码不能超过20个字符!' },
  ],
}

// todo: ------------------- 实现 Register 函数式组件 ---------------------
const Register: React.FC = () => {
  // 获取 From 表单的实例
  const [formRef] = Form.useForm<FormFieldsType>()

  // 动态生成“确认密码”字段的验证规则
  const getConfirmPwdRules = useCallback(
    (): Rule[] => [
      { required: true, message: '请确认密码!' },
      {
        validator(_: Rule, value: string) {
          if (!value || formRef.getFieldValue('password') === value) {
            return Promise.resolve()
          }
          return Promise.reject(new Error('两次输入的密码不一致!'))
        },
      },
    ],
    [formRef]
  )

  return (
    <Flex justify="center" align="center" style={{ width: '100vw', height: '100vh' }}>
      <Card
        title="用户注册"
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
            <Form.Item<FormFieldsType>
              label="用户名"
              name="username"
              rules={FORM_RULES.username}
              labelCol={{ span: 4 }}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>

            {/* 密码字段 */}
            <Form.Item<FormFieldsType>
              label="密码"
              name="password"
              rules={FORM_RULES.password}
              labelCol={{ span: 4 }}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>

            <Form.Item
              label="确认密码"
              name="confirmPwd"
              dependencies={['password']}
              hasFeedback
              labelCol={{ span: 4 }}
              rules={getConfirmPwdRules()}
            >
              <Input.Password />
            </Form.Item>

            {/* 记住密码字段 */}
            <Form.Item<FormFieldsType> name="remember" valuePropName="checked" label={null}>
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            {/* 登录按钮 */}
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
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

export default Register
