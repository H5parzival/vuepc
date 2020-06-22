// 存储token
export function localSave (key = 'token', value) {
  window.localStorage.setItem(key, value)
}
//获取token
export function localGet (key = 'token') {
  return window.localStorage.getItem(key)
}
// 删除token
export function localRemove (key = 'token') {
  window.localStorage.removeItem(key)
}
