import axios from 'axios'
import { Message } from 'element-ui'
// 导入获取token方法
import { localGet, localRemove } from './local.js'
// 导入router
import router from '@/router/index.js'
// 创建axios副本
let _fetch = axios.create({
  baseURL: process.env.VUE_APP_URL,
  withCredentials: true //true跨域照样携带cookie
})
// 添加请求拦截器
_fetch.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    window.console.log('config', config)
    window.console.log('token', localGet())
    if (localGet()) {
      config.headers.token = localGet()
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
_fetch.interceptors.response.use(
  function (response) {
    window.console.log('response:', response)
    // 对响应数据做点什么
    if (response.data.code == 200 || response.config.noerror == true) {
      return response.data
    } else if (response.data.code == 206) {
      //删除token
      localRemove()
      //跳转至登陆页
      router.push('/')
      //不需要接口继续执行.then,抛出一个错误
      Message.error(response.data.message)
      return Promise.reject('error')
    } else {
      Message.error(response.data.message)
      //   抛出错误。中止了后面.then的执行
      return Promise.reject('error')
      //   alert(response.data.message)
    }
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
export default _fetch
