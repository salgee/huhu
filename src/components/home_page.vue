<template>
 <div id="homePage">
  <mt-swipe :auto="0">
   <mt-swipe-item name="1"><img src="../assets/logo.png" alt=""></mt-swipe-item>
   <mt-swipe-item><img src="../assets/logo.png" alt=""></mt-swipe-item>
   <mt-swipe-item><img src="../assets/logo.png" alt=""></mt-swipe-item>
  </mt-swipe>
  <div class="orderInfo">
   <img src="../assets/images/返回@2x.png" alt=""><span>您没有需要确定的订单</span><img src="../assets/images/返回@2x.png" >
  </div>
  <nav-bar></nav-bar>
   <router-link tag="span" to="/login">登录</router-link>
 </div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui'
import navBar from './navBar/bottom_bar.vue'
export default {
  name: 'homepage',
  data () {
    return {
      msg: 9
    }
  },
  components: {
    Swipe, SwipeItem, navBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#homePage{
 width:100vw;
 height: 100vh;
 font-size: 0;
}
#homePage .mint-swipe{
 width: 100%;
 height: 30%;
 background-color: #000;
}
#homePage .mint-swipe img{
 width: 100%;
 height: 100%;
}
#homePage .orderInfo{
 position: relative;
 top: -15px;
 margin: 0 auto;
 width: 90%;
 height: 30px;
 line-height: 30px;
 text-align: center;
 background-color: #fff;
 box-shadow: 0 12px 12px -8px rgba(121,172,54,.8);
}
 #homePage .orderInfo span{
  display: inline-block;
  width: 90%;
  font-size: 12px;
  text-indent: 12px;
  vertical-align: middle;
  text-align: left;
  color: #79ac36;
 }
#homePage .orderInfo img{
 width: 8px;
 height:14px;
 vertical-align: middle;
}
</style>
