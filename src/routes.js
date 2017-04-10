/**
 * Created by Administrator on 2017/3/27.
 */
// 导入我们要跳转的膜版页面
import homePage from './components/home_page.vue'
<<<<<<< HEAD
import login from './components/login.vue'

=======
import addHouse from './components/add_house.vue'
>>>>>>> 1f7f4307d9de763816aac0a1bfde0dc652c2f9d7
// 定义路由集合
const routes = [
  {
    name: 'homePage',
    path: '/',
    component: homePage
  },
  {
<<<<<<< HEAD
    name: 'login',
    path: '/login',
    component: login
=======
    name: 'add',
    path: '/addhouse',
    component: addHouse
>>>>>>> 1f7f4307d9de763816aac0a1bfde0dc652c2f9d7
  }
]
export default routes
