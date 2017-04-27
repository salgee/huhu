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
     <img slot="icon" src="../../static/unselected/添加@2x.png" height="24" width="24">
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
export default {
  name: 'homepage',
  mounted () {
  },
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
      if (this.selected === 'home') {
        return '../../static/selected/home@2x.png'
      } else {
        return '../../static/unselected/home@2x.png'
      }
    },
    processing () {
      if (this.selected === 'order') {
        return '../../static/selected/processing@2x.png'
      } else {
        return '../../static/unselected/processing@2x.png'
      }
    },
    wallet () {
      if (this.selected === 'wallet') {
        return '../../static/selected/wallet@2x.png'
      } else {
        return '../../static/unselected/wallet@2x.png'
      }
    },
    user () {
      if (this.selected === 'user') {
        return '../../static/selected/user@2x.png'
      } else {
        return '../../static/unselected/user@2x.png'
      }
    }
  },
  watch: {
    selected (val, oldval) {
      this.$router.push(`/${val}`)
    },
    $route (to, from) {
      let vm = this
      vm.selected = to.matched[1].name
      if (to.path.split('/').length > 2) return
      vm[to.name] = `../../static/selected/${to.name}@2x.png`
      vm[from.name] = `../../static/unselected/${from.name}@2x.png`
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
