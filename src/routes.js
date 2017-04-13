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
import wodepinjia from './components/wode/wodepinjia'
import youhuijuan from './components/wode/youhuijuan'
import zhifumima from './components/wode/zhifumima'
import shezhi from './components/wode/shezhi'
import fenxiang from './components/wode/fenxiang'

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
        path: '/user',
        component: user
      }
    ]
  },
  {
    name: 'register',
    path: '/user/register',
    alias: './user/register/#',
    component: register
  },
  {
    name: 'wangjipws',
    path: '/user/wangjipws',
    alias: './user/wangjipws/#',
    component: wangjipws
  },
  {
    name: 'login',
    path: '/user/login',
    alias: './user/login/#',
    component: login
  },
  {
    name: 'add',
    path: '/addHouse',
    component: addHouse
  },
  {
    name: 'user',
    path: '/user',
    component: user
  },
  {
    name: 'shezhi',
    path: '/shezhi',
    component: shezhi
  },
  {
    name: 'wodepinjia',
    path: '/wodepinjia',
    component: wodepinjia
  },
  {
    name: 'youhuijuan',
    path: '/youhuijuan',
    component: youhuijuan
  },
  {
    name: 'fenxiang',
    path: '/fenxiang',
    component: fenxiang
  },
  {
    name: 'zhifumima',
    path: '/zhifumima',
    component: zhifumima
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
