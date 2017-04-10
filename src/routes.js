/**
 * Created by Administrator on 2017/3/27.
 */
// 导入我们要跳转的膜版页面
import homePage from './components/home_page.vue'
import addHouse from './components/add_house.vue'
// 定义路由集合
const routes = [
  {
    name: 'homePage',
    path: '/',
    component: homePage
  },
  {
    name: 'add',
    path: '/addhouse',
    component: addHouse
  }
]
export default routes
