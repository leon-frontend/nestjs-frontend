# 01. 响应式布局

## 1.1 Login & Register 页面

```tsx
// todo: ------------------- 实现 Register 函数式组件 ---------------------
const Register: React.FC = () => {
  ... ...
  return (
    <div style={{ minHeight: '100vh', padding: '20px', backgroundColor: '#f5f5f5' }}>
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col
          xs={22} // 手机端：占22/24列，留1列边距
          sm={20} // 小平板：占20/24列
          md={16} // 中等屏幕：占16/24列
          lg={12} // 大屏幕：占12/24列
          xl={10} // 超大屏幕：占10/24列
          xxl={8} // 超超大屏幕：占8/24列
        >
          <Card style={{ width: '100%', maxWidth: '500px', minWidth: '320px' }}>... ...</Card>
        </Col>
      </Row>
    </div>
  )
}
```

