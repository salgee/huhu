<template>
 <div id="homePage">
  <router-view></router-view>
   <mt-tabbar v-model="selected" :fixed=true>
     <mt-tab-item id="home">
       <img slot="icon" :src="url1">
       房源
     </mt-tab-item>
   <mt-tab-item id="order">
     <img slot="icon" :src="url2">
     订单
   </mt-tab-item>
   <mt-tab-item id="add" class="add">
     <img slot="icon" src="../../static/unselected/添加@2x.png" height="24" width="24">
   </mt-tab-item>
   <mt-tab-item id="wallet" >
     <img slot="icon" :src="url3">
     钱包
   </mt-tab-item>
   <mt-tab-item id="user">
     <img slot="icon" :src="url4">
     我的
   </mt-tab-item>
  </mt-tabbar>
 </div>
</template>

<script>
import {Tabbar, TabItem} from 'mint-ui'
export default {
  name: 'homepage',
  mounted () {
    this.selected = this.$route.name
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    console.log(to)
    if (sessionStorage.overdueToken === '1' && (to.path === '/order' || to.path === '/wallet')) {
      next('/user/login')
    } else {
      next()
    }
  },
  data () {
    return {
      selected: '',
      url1: '../../static/unselected/房源@2x.png',
      url2: '../../static/unselected/订单@2x.png',
      url3: '../../static/unselected/钱包@2x.png',
      url4: '../../static/unselected/我的@2x.png'
    }
  },
  components: {
    Tabbar, TabItem
  },
  computed: {
  },
  watch: {
    selected (val, oldval) {
      let vm = this
      vm.url1 = '../../static/unselected/房源@2x.png'
      vm.url2 = '../../static/unselected/订单@2x.png'
      vm.url3 = '../../static/unselected/钱包@2x.png'
      vm.url4 = '../../static/unselected/我的@2x.png'
      switch (val) {
        case 'wallet':
          this.$router.push('/wallet')
          this.url3 = '../../static/selected/钱包@2x.png'
          break
        case 'home':
          this.$router.push('/home')
          this.url1 = '../../static/selected/房源@2x.png'
          break
        case 'order':
          this.$router.push('/order')
          this.url2 = '../../static/selected/订单@2x.png'
          break
        case 'user':
          this.$router.push('/user')
          this.url4 = '../../static/selected/我的@2x.png'
          break
        case 'add':
          this.$router.push('/home/addHouse')
          break
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
 #homePage{
  width:100vw;
  height: 100vh;
  font-size: 0;
 }
 #homePage .mint-tabbar{
  border-top: 1px solid #ededed;
 }
 #homePage .add .mint-tab-item-icon{
   margin: 0;
   height: 100%;
   width: 100%;
 }
 #homePage .add .mint-tab-item-icon img{
  margin: auto;
  width: 40px;
  height: 40px;
 }
 #homePage .is-selected{
  color: #79ac36;
  background-color: #fff;
 }
</style>
