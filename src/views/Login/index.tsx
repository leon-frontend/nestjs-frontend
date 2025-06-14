import { Button, Card, Checkbox, Col, Form, Input, Row } from 'antd'
import AuthSwitchBtn from '@/components/AuthSwitchBtn'
import type React from 'react'
import type { FormProps } from 'antd'

// 表单字段类型
export type FormFieldsType = {
  username: string
  password: string
  remember?: string
}

// onFinishFailed 函数会在表单提交失败时调用
const onFinishFailed: FormProps<FormFieldsType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo)
}

// validate: 表单验证规则
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

// todo: ------------------- 实现 Login 函数式组件 ---------------------
const Login: React.FC = () => {
  // 获取 From 表单的实例
  const [formRef] = Form.useForm<FormFieldsType>()

  // formSubmit 函数会在表单提交成功时调用
  const formSubmit: FormProps<FormFieldsType>['onFinish'] = (values) => {
    console.log('Success:', values)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '20px',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col
          xs={22} // 手机端：占22/24列，留1列边距
          sm={20} // 小平板：占20/24列
          md={16} // 中等屏幕：占16/24列
          lg={12} // 大屏幕：占12/24列
          xl={10} // 超大屏幕：占10/24列
          xxl={8} // 超超大屏幕：占8/24列
        >
          <Card
            title="用户注册"
            extra={<AuthSwitchBtn />}
            variant="borderless"
            style={{
              width: '100%',
              maxWidth: '500px',
              minWidth: '320px',
            }}
          >
            <Form
              form={formRef}
              name="basic"
              layout="vertical"
              initialValues={{ remember: false }}
              onFinish={formSubmit}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              {/* 用户名字段 */}
              <Form.Item<FormFieldsType> label="用户名" name="username" rules={FORM_RULES.username}>
                <Input placeholder="请输入用户名" size="large" />
              </Form.Item>

              {/* 密码字段 */}
              <Form.Item<FormFieldsType> label="密码" name="password" rules={FORM_RULES.password}>
                <Input.Password placeholder="请输入密码" size="large" />
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
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Login
