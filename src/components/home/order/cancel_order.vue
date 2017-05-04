<template>
  <div id="cancel">
    <mt-loadmore
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      ref="loadmore"
      class="wrapper"
      :autoFill=false
      v-if="orderInfos.length !== 0">
      <div class="wrapper" v-if="orderInfos.length !== 0">
        <section v-for="(infos, index) in orderInfos" :key="infos.orderInfo.id" class="cancel-order"
          @click=pushDetails(infos)>
          <order-main :infos="infos">
            <div slot="delete" class="delete" @click.stop="deleteOrder(infos.orderInfo.orderId, index)"></div>
          </order-main>
          <div class="order-handle">
            <span v-if="infos.housekeeper" class="remark">订单未支付</span>
            <span v-else class="remark">{{remark}}</span>
            <mt-button size="small" @click.stop="remakeOrder(infos)">再次派单</mt-button>
          </div>
        </section>
      </div>
    </mt-loadmore>
    <div v-else class="default">没有订单</div>
  </div>
</template>

<script>
  import Axios from 'axios'
  import orderMain from './order_main.vue'
  import {Button, Toast, MessageBox, Indicator} from 'mint-ui'
  import moment from 'moment'
  moment.locale('zh-cn')

  export default {
    name: 'cancel',
    data () {
      return {
        orderInfos: [],
        remark: '未被抢单',
        allLoaded: false,
        page: 1
      }
    },
    mounted () {
      this.getOrderList(1)
      this.getDays()
      this.getTodayTime()
    },
    components: {
      orderMain,
      mtButton: Button,
      Toast,
      MessageBox,
      Indicator
    },
    methods: {
      getOrderList (page) {
        let vm = this
        return Axios.get('/api/order/findOrders/landlord/cancel/10/' + page, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-token': localStorage.token
          }
        })
          .then(function (data) {
            const dt = data.data
            if (dt.message === 'isOk') {
              if (page === 1) {
                vm.orderInfos = dt.data.list
              } else {
                vm.orderInfos = vm.orderInfos.concat(dt.data.list)
              }
            } else {
              Indicator.close()
              Toast({
                message: dt.message,
                position: 'bottom',
                duration: 2000
              })
            }
          })
          .catch(function (error) {
            Indicator.close()
            Toast({
              message: error,
              position: 'bottom',
              duration: 2000
            })
            throw error
          })
      },
      remakeOrder (infos) {
        let that = this
        Promise.resolve(
          sessionStorage.orderUseHouesId = infos.houseInfo.id,
          sessionStorage.orderUseHouesProvince = infos.houseInfo.province,
          sessionStorage.orderUseHouesCity = infos.houseInfo.city,
          sessionStorage.orderUseHouesVip = infos.houseInfo.vip,
          sessionStorage.orderUseHouesRoom = infos.houseInfo.bedRoom,
          sessionStorage.orderUseHouesforegift = infos.houseInfo.foregift,
          sessionStorage.hehereception = that.whatType(infos),
          sessionStorage.hehecheckInPerson = infos.orderInfo.checkInPerson,
          sessionStorage.hehecheckInPhone = infos.orderInfo.checkInPhone,
          sessionStorage.orderDetailList = JSON.stringify(infos.orderInfo.orderDetailList),
        ).then(
          () => {
            that.$router.push('/home/pushOrderBefore')
          })
      },
//      whyccup需要的判断函数---------------------------------
      whatType: function (infos) {
        if (infos.orderInfo.receptionType === 'byYourself') {
          return '自主入住'
        } else {
          return '接引顾客'
        }
      },
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
//      -----------------------------------------------------
      deleteOrder (orderId, index) {
        MessageBox.confirm('确定删除订单?', '').then(action => {
          let vm = this
          Axios.post('/api/order/delete/' + orderId, {}, {
            headers: {
              'Content-Type': 'application/json',
              'x-api-token': localStorage.token
            }
          })
            .then(function (data) {
              const dt = data.data
              if (dt.message === 'isOk') {
                vm.orderInfos.splice(index, 1)
                Toast({
                  message: '订单已删除',
                  position: 'bottom',
                  duration: 2000
                })
              } else {
                Toast({
                  message: dt.message,
                  position: 'bottom',
                  duration: 2000
                })
              }
            })
            .catch(function (error) {
              Toast({
                message: error,
                position: 'bottom',
                duration: 2000
              })
            })
        })
      },
      pushDetails (infos) {
        if (infos.housekeeper !== undefined) {
          sessionStorage.huhu_name = infos.housekeeper.name || ''
          sessionStorage.huhu_rej = infos.housekeeper.rejectTimes || 0
          sessionStorage.huhu_ser = infos.housekeeper.serviceTimes || 0
          sessionStorage.huhu_avatar = 'http://139.224.238.161:9997' + infos.housekeeper.avatar
        }
        this.$router.push({name: 'orderInfo', params: {orderType: 'cancel', orderId: infos.orderInfo.orderId}})
      },
      // 更新列表
      loadTop () {
        let vm = this
        vm.page = 1
        vm.getOrderList(1)
          .then(() => {
            Toast({
              message: '刷新成功',
              position: 'bottom',
              duration: 2000
            })
            vm.$refs.loadmore.onTopLoaded()
          })
      },
      // 加载更多
      loadBottom () {
        let vm = this
        vm.page += 1
        vm.getOrderList(vm.page)
          .then(() => {
            Toast({
              message: vm.msg,
              position: 'bottom',
              duration: 2000
            })
            vm.$refs.loadmore.onBottomLoaded()
          })
          .catch(() => {
            vm.$refs.loadmore.onBottomLoaded()
          })
      }
    },
    watch: {
      orderInfos (val) {
        Indicator.close()
      }
    }
  }
</script>

<style>
  #cancel {
    position: fixed;
    top: 75px;
    bottom: 56px;
    width: 100%;
    overflow: scroll;
  }
  #cancel .default {
    width: 100%;
    height: 100%;
    background: url(../../../assets/images/activity_one_house.png) no-repeat center;
    background-size: 40%;
  }
  #cancel .cancel-order {
    padding:20px 15px 25px;
    font-size: 12px;
    border-bottom: 2px solid #ddd;
  }
  #cancel .customer {
    position: relative;
    border-bottom: 1px solid #ededed;
    margin-bottom: 15px;
  }
  #cancel .customer img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 20px;
    margin-bottom: 4px;
    vertical-align: middle;
  }
  #cancel .remark {
    float: left;
    color: #74a92e;
    line-height: 26px;
  }
</style>
