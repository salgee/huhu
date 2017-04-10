/**
 * Created by Administrator on 2017/3/27.
 */
// 导入我们要跳转的膜版页面
import hello from './components/hello.vue'

// 定义路由集合
const routes = [
  {
    name: 'hello',
    path: '/',
    component: hello
  }
]
export default routes
