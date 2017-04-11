/**
 * Created by Administrator on 2017/3/27.
 */
// 导入我们要跳转的膜版页面
import homePage from './components/home_page.vue'
import houseItem from './components/house_item.vue'
import login from './components/login.vue'
import addHouse from './components/add_house.vue'
import homeNav from './components/home/home_nav.vue'
import wallet from './components/home/wallet.vue'
import user from './components/home/user.vue'
import order from './components/home/order.vue'
// 定义路由集合
const routes = [
  {
    path: '/',
    component: homePage,
    children: [
      {
        name: 'home',
        path: '',
        component: homeNav
      },
      {
        name: 'wallet',
        path: 'wallet',
        component: wallet
      },
      {
        name: 'home',
        path: 'home',
        component: homeNav
      },
      {
        name: 'order',
        path: 'order',
        component: order
      },
      {
        name: 'user',
        path: 'user',
        component: user
      }
    ]
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
  }
]
export default routes
