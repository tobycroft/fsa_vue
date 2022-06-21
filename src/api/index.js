/**
 * 暴露@/api文件夹下除index.js之外的所有api文件转化的一个Object对象
 * Object的key是  文件名.接口名  如有多层文件夹，文件夹名.文件夹名.接口名
 * Object的value是  接口地址
 * 暴露的例子如下 api: {
 *    "common.getStoragePath": '/oss/oss/getStoragePath', //根据ossid获取实际文件存储路径
 *    "login.accountLogin": '/sys/login/login', //用户名密码登录
 *    "login.getUserInfo": '/sys/login/getUserInfo', //获取用户信息
 *    "login.logout": '/sys/login/logout' //退出
 *    "kms.listUserStationCourseCount": '/kms/KmsCourseApi/listUserStationCourseCount', //获取岗位列表
 * }
 */

const req = require.context('./', true, /\.js/)

const api = {}

req.keys().forEach(key => {
  //排除index.js文件自己本身
  if (key === './index.js') return

  //将  ./aaa/bbb.js  转为  aaa.bbb
  let path = key
    .replace('./', '')
    .replace('.js', '')
    .replace('/', '.')

  //文件内容
  const fileContent = req(key).default

  //递归添加API路径方法
  const addPath = (path, file) => {
    if (typeof file === 'object') {
      Object.keys(file).forEach(key => {
        addPath(path + '.' + key, file[key])
      })
    } else {
      if (path in api) {
        console.warn(`API路径【${path}】重复，后添加路径会覆盖先前添加的，请避免在/src/api文件夹中创建相同名字的文件夹与js文件`)
      }
      api[path] = file
    }
  }
  addPath(path, fileContent)
})

export default api
