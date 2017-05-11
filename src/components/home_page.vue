<template>
 <div id="homePage">
  <router-view></router-view>
   <mt-tabbar v-model="selected" fixed>
     <mt-tab-item id="home">
       <img slot="icon" :src="home">
       房源
     </mt-tab-item>
   <mt-tab-item id="order">
     <img slot="icon" :src="processing">
     订单
   </mt-tab-item>
   <mt-tab-item id="add" class="add">
     <img slot="icon" src="../assets/unselected/添加@2x.png" height="24" width="24">
   </mt-tab-item>
   <mt-tab-item id="wallet" >
     <img slot="icon" :src="wallet">
     钱包
   </mt-tab-item>
   <mt-tab-item id="user">
     <img slot="icon" :src="user">
     我的
   </mt-tab-item>
  </mt-tabbar>
 </div>
</template>

<script>
import {Tabbar, TabItem} from 'mint-ui'
import user from '../assets/selected/user@2x.png'
import home from '../assets/selected/home@2x.png'
import order from '../assets/selected/processing@2x.png'
import wallet from '../assets/selected/wallet@2x.png'
import unuser from '../assets/unselected/user@2x.png'
import unorder from '../assets/unselected/processing@2x.png'
import unhome from '../assets/unselected/home@2x.png'
import unwallet from '../assets/unselected/wallet@2x.png'
export default {
  name: 'homepage',
  data () {
    return {
      selected: sessionStorage.huhu_homeselected || 'home'
    }
  },
  components: {
    Tabbar, TabItem
  },
  computed: {
    home () {
      return this.selected === 'home' ? home : unhome
    },
    processing () {
      return this.selected === 'order' ? order : unorder
    },
    wallet () {
      return this.selected === 'wallet' ? wallet : unwallet
    },
    user () {
      return this.selected === 'user' ? user : unuser
    }
  },
  watch: {
    selected (val, oldval) {
      if (val === 'add') {
        this.$router.push('/home/addHouse')
      } else {
        this.$router.push(`/${val}`)
      }
    }
  },
  // 通过路由名字判断底部导航栏选中状态
  beforeRouteEnter (to, from, next) {
    sessionStorage.huhu_homeselected = to.matched[1].name
    next()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
 #homePage{
  width:100vw;
  min-height: 100vh;
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
