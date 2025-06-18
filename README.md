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

# 03. 用户管理页面

根据当前的功能，我们可以将其划分为三个核心组件：

1. `UsersPage.tsx`: **页面容器组件（父组件）**。负责管理整个页面的状态（如用户数据、加载状态）、执行数据请求、处理核心业务逻辑（新增、更新、删除用户的API调用）。
2. `UsersTable.tsx`: **纯展示组件**。负责接收用户数据并渲染表格。当用户点击“编辑”或“删除”按钮时，它通过 props 回调函数通知父组件。
3. `UserFormModal.tsx`: **功能组件**。负责渲染模态框和内部的表单。它管理自身的显示/隐藏状态以及表单的内部状态，并在提交时将数据传递给父组件。

## 3.1 表格滚动条 Bug 

- **实现的效果**：当表格高度不超过 70vh 不显示滚动条，当超过 70vh 时才显示滚动条（固定表头）。
- 当设置 `scroll={{y: xxx}}` 时， antd 会在内部给 `.ant-table-body` 元素添加一个行内样式 `style="height: 70vh; overflow: scroll;"`。该属性会强制浏览器始终显示滚动条（即使内容没有溢出，也会显示一个禁用的滚动条）。

```tsx
<Table<DataType>
  dataSource={paginatedData}
  pagination={false}
  scroll={{ y: '70vh' }} // 当超过 70vh 时才显示滚动条（固定表头），但是高度没超过 70vh 时也会显示滚动条轨道
>xxx</Table>

/* 当表格的高度不超过 scroll={{ y: '70vh' }} 时，不显示滚动条 */
.ant-table-body {
  overflow-y: auto !important;
}
```

