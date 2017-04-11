/**
 * Created by Administrator on 2017/3/27.
 */
// 导入我们要跳转的膜版页面
import homePage from './components/home_page.vue'
import houseItem from './components/house_item.vue'
import login from './components/login.vue'
import addHouse from './components/add_house.vue'
import singlePush from './components/single_push.vue'
import joinVip from './components/join_vip.vue'
import wangjipws from './components/wangjipws.vue'

// 定义路由集合
const routes = [
  {
    name: 'homePage',
    path: '/',
    component: homePage
  },
  {
    name: 'wangjipws',
    path: '/wangjipws',
    component: wangjipws
  },
  {
    name: '438',
    path: '/438',
    component: houseItem
  },
  {
    name: 'login',
    path: '/login',
    component: login
  },
  {
    name: 'add',
    path: '/addhouse',
    component: addHouse
  },
  {
    name: 'singlePush',
    path: '/singlePush',
    component: singlePush
  },
  {
    name: 'joinVip',
    path: '/joinVip',
    component: joinVip
  }
]
export default routes
