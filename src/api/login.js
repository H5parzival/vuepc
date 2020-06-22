import _fetch from '@/utils/request.js'
// 获取短信验证码
export function sendsms (data) {
  return _fetch({
    url: '/sendsms',
    method: 'post',
    noerror: true, //如果设置了该参数，就不启用拦截器的错误处理
    data //data:data
  })
}
// 注册
export function register (data) {
  return _fetch({
    url: '/register',
    method: 'post',
    //如果设置了该参数，就不启用拦截器的错误处理
    data //data:data
  })
}
// 用户登陆
export function login (data) {
  return _fetch({
    url: '/login',
    method: 'post',
    //如果设置了该参数，就不启用拦截器的错误处理
    data //data:data
  })
}
