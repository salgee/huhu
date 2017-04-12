import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)

// 实例化router对象
const router = new VueRouter({
  routes
})

// 导出router对象
export default router
/**
 * Created by Administrator on 2017/4/10.
 */
