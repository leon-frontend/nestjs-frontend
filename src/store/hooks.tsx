import { useDispatch, useSelector } from 'react-redux'
import type { RootDispatch, RootState } from './types'

// 下述代码的错误原因：是在模块的顶层直接调用了 React Hook，而不是在函数内部调用。
// export const useAppDispatch = useDispatch<RootDispatch>()

// 通过 useDispatch Hook 得到的 dispatch 函数，仅适合与普通的 action 对象一起使用，不适合与 thunk action 配合使用（缺少 TS 类型支持）
// .withTypes 是一种 TypeScript 类型扩展，用于为自定义 Hook 添加更多 TS 类型信息。
export const useAppDispatch = useDispatch.withTypes<RootDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
