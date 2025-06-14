import store from './index'

// 定义 store 中所有数据的 ts 类型，命名为 RootState
export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch
