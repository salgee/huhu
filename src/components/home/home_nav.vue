<template>
  <div class="home-nav">
    <mt-swipe :auto="0">
      <mt-swipe-item name="1"><img src="../../assets/logo.png" alt=""></mt-swipe-item>
      <mt-swipe-item><img src="../../assets/logo.png" alt=""></mt-swipe-item>
      <mt-swipe-item><img src="../../assets/logo.png" alt=""></mt-swipe-item>
    </mt-swipe>
    <mt-cell title="您没有订单需要确认" >
      <img src="../../assets/images/返回@2x.png" alt="" width="8" height="14">
      <img slot="icon" src="../../assets/images/布告栏@2x.png" width="14" height="14">
    </mt-cell>
      <div class="houseList" style="padding-bottom: 40px;padding-top: 5px;">
        <div class="homeBackground" v-if="houseInfos.length === 0">
          <p>您还没有添加房源哦，赶快去添加吧</p>
        </div>
        <houseItem v-else v-for="houseInfo in houseInfos" key="houseInfo" :houseInfo="houseInfo"></houseItem>
      </div>
  </div>
</template>
<script>
  import {Swipe, SwipeItem, Cell} from 'mint-ui'
  import houseItem from '../house_item.vue'
  import Axios from 'axios'
  Axios.defaults.baseURL = 'http://a.com'
  export default {
    name: 'addHouse',
    mounted () {
      this.homeList()
      console.log(this.houseInfos.length)
    },
    data () {
      return {
        houseInfos: []
      }
    },
    methods: {
      //  whyccup写的
      homeList: function () {
        let that = this
        Axios.get('/api/house/list',
          {
            headers: {'Content-Type': 'application/json',
              'x-api-token': localStorage.token
            }
          }).then(function (data) {
            if (data.data.message === 'isOk') {
              sessionStorage.overdueToken = 0
              that.houseInfos = data.data.data
            } else {
              sessionStorage.overdueToken = 1
              that.$toast({
                message: '您的登录已过期',
                position: 'bottom'
              })
            }
            console.log(data)
          })
      }
    },
    components: {
      Swipe, SwipeItem, Cell, houseItem
    }
  }
</script>

<style>
.home-nav{
  width:100vw;
  height: 100vh;
  font-size: 0;
}
.home-nav .mint-swipe{
  width: 100%;
  height: 30%;
  background-color: #000;
}
.home-nav .mint-cell-title img{
  margin-right: 12px;
}
.home-nav .mint-swipe img{
  width: 100%;
  height: 100%;
}
.home-nav .mint-cell {
  position: relative;
  top: -15px;
  margin: 0 auto;
  width: 90%;
  min-height: 30px;;
  background-color: #fff;
  box-shadow: 0 12px 12px -8px rgba(121,172,54,.8);
}
.home-nav .mint-cell-wrapper{
  font-size: 12px;
}
.homeBackground {
  position: relative;
  padding-top: 100%;
  font-size: 13px;
  text-align: center;
    background: url(../../assets/images/activity_one_house.png) no-repeat center;
  background-size: 40%;
}
.homeBackground p {
  position: absolute;
  top: 70%;
  left: 0;
  right: 0;
  color: #bdbdbd;
  letter-spacing: 2px;
}
</style>
