<template>
  <div class="home-nav">
    <mt-swipe :auto="0" style="position: fixed; top: 0;">
      <mt-swipe-item name="1"><img src="../../assets/logo.png" alt=""></mt-swipe-item>
      <mt-swipe-item><img src="../../assets/logo.png" alt=""></mt-swipe-item>
      <mt-swipe-item><img src="../../assets/logo.png" alt=""></mt-swipe-item>
    </mt-swipe>
    <mt-cell v-if="houseInfos.length!==0" :title="orderNum" to="/home/order/onOrder">
      <img src="../../assets/images/返回@2x.png" alt="" width="8" height="14"  >
      <img slot="icon" src="../../assets/images/布告栏@2x.png" width="14" height="14">
    </mt-cell>
      <div class="houseList">
        <div class="homeBackground" v-if="houseInfos.length === 0" >
          <p>您还没有添加房源哦，赶快去添加吧</p>
        </div>
        <houseItem v-else v-for="houseInfo in houseInfos" key="houseInfo.id" :houseInfo="houseInfo"></houseItem>
      </div>
  </div>
</template>
<script>
  import {Swipe, SwipeItem, Cell, Indicator} from 'mint-ui'
  import houseItem from '../house_item.vue'
  import Axios from 'axios'
  import moment from 'moment'
  moment.locale('zh-cn')
  Axios.defaults.baseURL = 'http://a.com'
  export default {
    name: 'housenav',
    mounted () {
      this.getDays()
      this.getTodayTime()
      this.homeList()
      sessionStorage.overchangeorsave = 'change'
      // 查询订单
      this.getOrder()
    },
    data () {
      return {
        houseInfos: [],
        orderNum: '您没有订单需要确认'
      }
    },
    methods: {
//      获得日期
      getDays: function () {
        let days = []
        let m = ''
        if (moment().add(1800000, 'ms').get('h') >= 17) {
          m = 1
//          不要今天
        } else {
          m = 0
        }
        for (let i = m; i <= 60; i++) {
          let day = moment().add(i, 'd').format('YYYY-MM-DD(ddd)')
          days.push(day)
        }
        sessionStorage.days = JSON.stringify(days)
      },
//      获得现在时间
      getTodayTime: function () {
        let todayTime = []
        let todayT = moment().add(1800000, 'ms').get('h')
        let a = ''
        let b = ''
        if (todayT >= '5' && todayT < '17') {
          if (todayT === moment().get('h')) {
            for (let i = 3; i < 20 - todayT; i++) {
              a = moment().add(i, 'h').get('h') + ':30-' + moment().add(i + 1, 'h').get('h') + ':00'
              todayTime.push(a)
              b = moment().add(i + 1, 'h').get('h') + ':00-' + moment().add(i + 1, 'h').get('h') + ':30'
              todayTime.push(b)
            }
            todayTime.pop()
          } else {
            for (let j = 3; j <= 19 - todayT; j++) {
              b = moment().add(j + 1, 'h').get('h') + ':00-' + moment().add(j + 1, 'h').get('h') + ':30'
              todayTime.push(b)
              a = moment().add(j + 1, 'h').get('h') + ':30-' + moment().add(j + 2, 'h').get('h') + ':00'
              todayTime.push(a)
            }
          }
        } else {
          todayTime = ['08:00-08:30', '08:30-09:00', '09:00-09:30', '09:30-10:00', '10:00-10:30', '10:30-11:00', '11:00-11:30', '11:30-12:00', '12:00-12:30', '12:30-13:00', '13:00-13:30', '13:30-14:00', '14:00-14:30', '14:30-15:00', '15:00-15:30', '15:30-16:00', '16:00-16:30', '16:30-17:00', '17:00-17:30', '17:30-18:00', '18:00-18:30', '18:30-19:00', '19:00-19:30', '19:30-20:00']
        }
        sessionStorage.todayTime = JSON.stringify(todayTime)
      },
      //  whyccup写的
      homeList: function () {
        let that = this
        Axios.get('/api/house/list', {headers: {
          'Content-Type': 'application/json',
          'x-api-token': localStorage.token
        }}).then(function (data) {
          if (data.data.message === 'isOk') {
            that.houseInfos = data.data.data
            localStorage.isLogin = true
          } else {
            localStorage.isLogin = false
            that.isLogin = false
            that.$toast({
              message: '您的登录已过期',
              position: 'bottom'
            })
          }
          Indicator.close()
        })
      },
      getOrder () {
        let that = this
        Indicator.open()
        Axios.get('/api/order/findOrders/landlord/waitConfirm/0/0', {
          headers: {
            'Content-Type': 'application/json',
            'x-api-token': localStorage.token
          }
        })
          .then(function (data) {
            const dt = data.data
            if (dt.message === 'isOk') {
              if (dt.data.total === 0) return
              that.orderNum = `您有${dt.data.total}个订单需要确认`
            }
          })
      }
    },
    components: {
      Swipe, SwipeItem, Cell, houseItem, Indicator
    }
  }
</script>

<style>
.home-nav{
  width:100vw;
  min-height: 100vh;
  font-size: 0;
}
.home-nav .mint-swipe{
  width: 100%;
  height: 200px;
  background-color: #000;
}
.houseList ,.homeBackground{
  position:fixed;
  top:200px;
  padding-top: 25px;
  bottom: 56px;
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
}
.home-nav .mint-cell-title img{
  margin-right: 12px;
}
.home-nav .mint-swipe img{
  width: 100%;
  height: 100%;
}
.home-nav .mint-cell {
  position: absolute;
  top: 185px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 90%;
  min-height: 30px;
  z-index: 2;
  background-color: #fff;
  box-shadow: 0 12px 12px -8px rgba(121,172,54,.8);
}
.home-nav .mint-cell-wrapper{
  font-size: 12px;
  color: rgba(121,172,54,.8)
}
.homeBackground {
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
.homeBackground p:after{
  position: absolute;
  top: -35px;
  right: 100px;
  width: 20px;
  height: 30px;
  content: '';
  background:url('../../assets/images/解释符号.png') no-repeat center;
  background-size: 100%;

}
</style>
