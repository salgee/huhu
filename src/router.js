import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { Indicator } from 'mint-ui'
Vue.use(VueRouter)

// 实例化router对象
const router = new VueRouter({
  routes
})

// 路由切换动效
router.beforeEach((to, from, next) => {
  console.log(2)
  next()
})
router.afterEach(route => {
  Indicator.open({
    spinnerType: 'fading-circle'
  })
})
// 导出router对象
export default router
/**
 * Created by Administrator on 2017/4/10.
 */
