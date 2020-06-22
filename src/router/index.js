/*路由基本使用
1：安装  vue-router
2:导入  import VueRouter from 'vue-router'
3:注册  Vue.use(VueRouter)
4:实例化  const router=new VueRouter({routes:[]})
5:注入到new Vue({router})
6:路由出口  router-view
*/

// 2:导入
 import VueRouter from 'vue-router'
// import Nprogress from 'nprogress'
// 3:注册
import Vue from 'vue'
Vue.use(VueRouter)
// 4:实例化
import login from '@/views/login/login.vue'
import layout from '@/views/layout/layout.vue'
import chart from '@/views/layout/chart/chart.vue'
import userList from '@/views/layout/userList/userList.vue'
import question from '@/views/layout/question/question.vue'
import business from '@/views/layout/business/business.vue'
import subject from '@/views/layout/subject/subject.vue'
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/layout',
      component: layout,
      redirect: '/layout/chart',
      children: [
        {
          path: 'chart', //写/号是完整 path,不写它是相对于自己父级的地址(父级path+"/"+"自己地址")
          component: chart
        },
        {
          path: 'userList', //写/号是完整 path,不写它是相对于自己父级的地址(父级path+"/"+"自己地址")
          component: userList
        },
        {
          path: 'question', //写/号是完整 path,不写它是相对于自己父级的地址(父级path+"/"+"自己地址")
          component: question
        },
        {
          path: 'business', //写/号是完整 path,不写它是相对于自己父级的地址(父级path+"/"+"自己地址")
          component: business
        },
        {
          path: 'subject', //写/号是完整 path,不写它是相对于自己父级的地址(父级path+"/"+"自己地址")
          component: subject
        },
      ]
    }
  ]
})
//导入NProgress
// import NProgress from 'nprogress'
// //导入NProgress css
// import 'nprogress/nprogress.css'
// router.beforeEach((to, from, next) => {
//   Nprogress.start()
//   next()

// })
// router.afterEach(() => {
//   Nprogress.done()
// })
export default router
// 5:注入到new Vue({router})
// 6:路由出口  router-view     123
