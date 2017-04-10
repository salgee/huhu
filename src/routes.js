/**
 * Created by Administrator on 2017/3/27.
 */
// 导入我们要跳转的膜版页面
import homePage from './components/home_page.vue'
import houseItem from './components/house_item.vue'
// 定义路由集合
const routes = [
  {
    name: 'homePage',
    path: '/',
    component: homePage
  },
  {
    name: '438',
    path: '/438',
    component: houseItem
  }
]
export default routes
