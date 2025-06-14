import axios from 'axios'

// 创建 axios 实例
const instance = axios.create({
  baseURL: '/api/v1', // 请求路径的公共前缀
  timeout: 50000, // 请求的超时时间
})

// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 如果请求正常返回，则直接返回响应中的数据
    if (response.status === 200) {
      return response.data
    }

    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default instance
