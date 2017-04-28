/**
 * Created by Administrator on 2017/3/27.
 */
// 导入我们要跳转的膜版页面
import homePage from './components/home_page.vue'
import login from './components/login.vue'
import addHouse from './components/add_house.vue'
import pushOrderBefore from './components/push_order_before.vue'
import joinVip from './components/join_vip.vue'
import homeNav from './components/home/home_nav.vue'
import wallet from './components/home/wallet.vue'
import user from './components/home/user.vue'
import order from './components/home/order.vue'
import wangjipws from './components/wangjipws.vue'
import register from './components/register.vue'
import address from './components/add_house_info/add_address.vue'
import vipAgreement from './components/join_vip_agreement.vue'
import map from './components/add_house_info/map.vue'
import vipTakeMoney from './components/join_vip_takeMoney.vue'
import wodepinjia from './components/wode/wodepinjia'
import youhuijuan from './components/wode/youhuijuan'
import zhifumima from './components/wode/zhifumima'
import shezhi from './components/wode/shezhi'
import changeHouse from './components/change_house.vue'
import pushList from './components/push_list.vue'
import bedInfo from './components/add_house_info/bed_info.vue'
import onOrder from './components/home/order/onorder.vue'
import orderInfo from './components/home/order/order_info.vue'
import orderToConfirm from './components/home/order/orderToConfirm.vue'
import pushOrderVipGoods from './components/push_order_before_vip_goods.vue'
import walletRecharge from './components/home/wallet_recharge.vue'
import orderEvaluate from './components/home/order/order_evaluate.vue'
// 四个订单状态
import processing from './components/home/order/processing_order.vue'
import cancel from './components/home/order/cancel_order.vue'
import waitHandle from './components/home/order/waitHandle_order.vue'
import finish from './components/home/order/finish_order.vue'
import orderTrack from './components/home/order/order_track.vue'
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
        component: order,
        children: [
          {
            name: 'processing',
            path: 'processing',
            alias: '',
            components: {processing: processing}
          },
          {
            name: 'cancel',
            path: 'cancel',
            components: {cancel: cancel}
          },
          {
            name: 'waitHandle',
            path: 'waitHandle',
            components: {waitHandle: waitHandle}
          },
          {
            name: 'finish',
            path: 'finish',
            components: {finish: finish}
          }
        ]
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
    path: '/home/addHouse',
    component: addHouse
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
    name: 'zhifumima',
    path: '/zhifumima',
    component: zhifumima
  },
  {
    name: 'pushOrderBefore',
    path: '/home/pushOrderBefore',
    component: pushOrderBefore
  },
  {
    name: 'joinVip',
    path: '/user/vip/joinVip',
    component: joinVip
  },
  {
    name: 'address',
    path: '/home/addHouse/address',
    component: address
  },
  {
    name: 'vipAgreement',
    path: '/user/vip/joinVip/vipAgreement',
    component: vipAgreement
  },
  {
    name: 'map',
    path: '/home/addHouse/address/map',
    component: map
  },
  {
    name: 'vipTakeMoney',
    path: '/user/vip/joinVip/vipTakeMoney',
    component: vipTakeMoney
  },
  {
    name: 'changeHouse',
    path: '/user/changeHouse',
    component: changeHouse
  },
  {
    name: 'pushList',
    path: '/order/pushList',
    component: pushList
  },
  {
    name: 'bedInfo',
    path: '/home/addHouse/bedInfo',
    component: bedInfo
  },
  {
    name: 'onOrder',
    path: '/home/order/onOrder',
    component: onOrder
  },
  {
    name: 'orderInfo',
    path: '/home/order/:orderType/orderInfo/:orderId',
    component: orderInfo
  },
  {
    name: 'orderToConfirm',
    path: '/home/order/onOrder/orderToConfirm/:orderId/:id',
    component: orderToConfirm
  },
  {
    name: 'pushOrderVipGoods',
    path: '/home/pushOrderBefore/vipGoods',
    component: pushOrderVipGoods
  },
  {
    name: 'walletRecharge',
    path: '/wallet/walletRecharge',
    component: walletRecharge
  },
  {
    name: 'orderTrack',
    path: '/home/order/:orderType/orderInfo/:orderId/orderTrack',
    component: orderTrack
  },
  {
    name: 'orderEvaluate',
    path: '/home/order/orderEvaluate',
    component: orderEvaluate
  }
]
export default routes
