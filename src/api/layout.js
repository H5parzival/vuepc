import _fetch from '@/utils/request.js'
// 获取用户信息
export function getUserInfo () {
  return _fetch({
    url: '/info'
  })
}
// 退出
export function logout () {
  return _fetch({
    url: '/logout'
  })
}
