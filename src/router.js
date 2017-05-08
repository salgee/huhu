import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import Axios from 'axios'
Vue.use(VueRouter)

// 实例化router对象
const router = new VueRouter({
  routes
})
let isLogin = false
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    Axios.get('http://a.com/api/customer/landlord', {
      headers: {
        'Content-Type': 'application/json',
        'x-api-token': localStorage.token
      }
    })
      .then((data) => { isLogin = data.data.code !== -1 })
      .catch(() => { isLogin = false })
      .then(() => {
        console.log(isLogin)
        if (!isLogin) {
          next({
            path: '/user/login',
            query: { redirect: to.fullPath }
          })
        } else {
          next()
        }
      })
  } else {
    next() // 确保一定要调用 next()
  }
})
// 导出router对象
export default router
/**
 * Created by Administrator on 2017/4/10.
 */
