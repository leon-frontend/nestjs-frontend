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

# 02. 实现面包屑功能

- **Reference**: [React 实现面包屑导航](https://minjiechang.github.io/react/breadcrumb/#_3%E3%80%81%E8%B7%AF%E7%94%B1%E9%85%8D%E7%BD%AE)

- **实现思路**：1. 将嵌套的路由规则进行扁平化。2. 使用 Map 映射路由路径和路由标题（面包屑展示的内容）之间的关系。3. 使用 `str.split('/')` 方法将当前的路由路径转换为数组形式。4. 依次遍历数组中的元素，生成面包屑所需要的字段。5. 在渲染面包屑时，**不需要**将最后一个节点渲染成跳转链接。具体实现代码在 `layout/BreadNav/index.tsx` 文件中。

```ts
// 数组扁平化，转换成如下形式
[
  {path: "/", ...},
  {path: "/login", ...},
  {path: "/login/page", ...},
  {path: "/login/page", ...},
]
```

