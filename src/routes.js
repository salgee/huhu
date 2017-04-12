/**
 * Created by Administrator on 2017/3/27.
 */
// 导入我们要跳转的膜版页面
import homePage from './components/home_page.vue'
import login from './components/login.vue'
import addHouse from './components/add_house.vue'
import singlePush from './components/single_push.vue'
import joinVip from './components/join_vip.vue'
import homeNav from './components/home/home_nav.vue'
import wallet from './components/home/wallet.vue'
import user from './components/home/user.vue'
import order from './components/home/order.vue'
import wangjipws from './components/wangjipws.vue'
import register from './components/register.vue'
import address from './components/add_house_info/add_address.vue'
import vipAgreement from './components/join_vip_agreement.vue'

// 定义路由集合
const routes = [
  {
    path: '/',
    component: homePage,
    children: [
      {
        name: 'home',
        path: '',
        alias: 'home',
        component: homeNav
      },
      {
        name: 'wallet',
        path: 'wallet',
        component: wallet
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
    name: 'register',
    path: '/register',
    component: register
  },
  {
    name: 'wangjipws',
    path: '/wangjipws',
    component: wangjipws
  },
  {
    name: 'login',
    path: '/login',
    component: login
  },
  {
    name: 'add',
    path: '/addHouse',
    component: addHouse
  },
  {
    name: 'singlePush',
    path: '/singlePush',
    component: singlePush
  },
  {
    name: 'joinVip',
    path: '/user/joinVip',
    component: joinVip
  },
  {
    name: 'address',
    path: '/addHouse/address',
    component: address
  },
  {
    name: 'vipAgreement',
    path: '/user/joinVip/vipAgreement',
    component: vipAgreement
  }
]
export default routes
