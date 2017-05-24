<template>
  <div id="order-info">
    <mt-header title="订单详情" style="background: #79ac36;" fixed>
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <div class="details" v-if="orderInfo.orderInfo !==undefined">
      <mt-cell @click.native="push">
        <p slot="title" class="order-status">
          <span>订单状态</span>
          <span style="color: #74a92e;">{{orderStatus[orderInfo.orderInfo.orderStatus]}}</span>
        </p>
        <span>订单跟踪</span>
        <img src="../../../assets/images/返回@2x.png" width="8" height="14">
      </mt-cell>
      <p class="address">
        <img class="vip" v-if="orderInfo.houseInfo.vip === 1" src="../../../assets/images/VIP@2x.png" alt="">
        <span>{{orderInfo.houseInfo.address+orderInfo.houseInfo.buildingNo}}</span></br>
        <span>订单编号： {{orderInfo.orderInfo.orderId}}</span>
      </p>
      <section v-if="avatar !== undefined" class="manager">
        <img :src="avatar" alt="avatar">
        <p>
          <span>{{maName}}</span></br>
          <span class="star-level"
                :style="{ 'padding-left': starLevel + 'px' }">
          </span></br>
          <span>服务次数：{{serTimes}}</span>
          <span>拒单率：{{rejTimes}}%</span>
        </p>
      </section>
      <section class="customer-info">
        <p>
          <span>入住人姓名</span><span>{{orderInfo.orderInfo.checkInPerson}}</span>
          <span>入住人电话</span><span>{{orderInfo.orderInfo.checkInPhone}}</span>
          <span>接待方式</span><span>{{receptionType[orderInfo.orderInfo.receptionType]}}</span></br>
        </p>
        <p v-if="orderInfo.orderInfo.receptionType === 'byGuide'">
          <span>接引时间</span>
          <span>{{orderInfo.orderInfo.receptionTimeFromStr}}</span>
        </p>
        <p>
          <span>清洁日期</span>
          <span>{{orderInfo.orderInfo.serviceTimeFromStr}}</span>
        </p>
      </section>
      <append-order v-if="appendOrder !== undefined"
                    :appendOrder = appendOrder
                    :show=false></append-order>
      <section v-if="orderInfo.orderInfo.orderDetailList.length !== 0" class="exta-service">
        <p>
          额外服务:&nbsp;&nbsp;
          <span style="color: red;">
            &yen;&nbsp;&nbsp;&nbsp;{{extraFee(orderInfo.orderInfo.orderDetailList)}}
          </span>
        </p>
        <p v-for="item in orderInfo.orderInfo.orderDetailList" style="color: #888;">
          <span>{{item.productName}}x{{item.quantity}}</span>
          <span>&yen;&nbsp;{{item.quantity*item.price}}</span>
          <span v-if="item.foregift !== 0" style="width: 22%; float:right">押金 &yen;&nbsp;{{item.quantity*item.foregift}}</span>
        </p>
      </section>
      <section class="order-fee">
        <p>
          <span style="color: #888">服务费</span>
          <span style="color: #888">&yen; {{orderInfo.orderInfo.serviceFee.toFixed(2)}}</span>
          <span v-if="orderInfo.orderInfo.award">打赏</span>
          <span v-if="orderInfo.orderInfo.award" style="color: red">&yen; {{orderInfo.orderInfo.award.toFixed(2)}}</span>
          <span>实付款</span>
          <span style="color: red">&yen; {{orderInfo.orderInfo.totalAmount.toFixed(2)}}</span>
        </p>
      </section>
      <section v-if="orderInfo.orderInfo.picList.length !== 0" class="penalty">
        <h3>核实损耗</h3>
        <section>
          <img @click="showImgDetails('http://139.224.238.161:9997'+img)" v-for="img in piclist(orderInfo.orderInfo.picList[0])" :src="'http://139.224.238.161:9997'+img" >
        </section>
        <p>损耗核实，赔偿费用 <span>&yen;&nbsp;&nbsp;{{orderInfo.orderInfo.penalty.toFixed(2)}}</span></p>
      </section>
      <p class="order-time" v-if="this.$route.params.orderType !== 'finish'">
        <span>下单时间： {{orderInfo.orderInfo.createTimeStr}}</br></span>
        <span v-if="this.$route.params.orderType === 'cancel'">取消时间： {{orderInfo.orderInfo.cancelTimeStr}}</br></span>
        <span v-else-if="orderInfo.orderInfo.confirmTimeStr">确定时间： {{orderInfo.orderInfo.confirmTimeStr}}</span>
      </p>
      <button v-if="this.$route.params.orderType === 'cancel'" class="remake-order" @click="remakeOrder(orderInfo)">
        再次派单
      </button>
    </div>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade">
      <img @click="popupVisible = false" :src="src" style="width: 100%">
    </mt-popup>
  </div>
</template>

<script>
  import Axios from 'axios'
  import {Header, Toast, Cell, Popup, Indicator} from 'mint-ui'
  import appendOrder from './append_order.vue'
  import moment from 'moment'
  moment.locale('zh-cn')
  export default {
    name: 'app',
    data () {
      return {
        orderInfo: {},
        orderStatus: {
          cancel: '已取消',
          news: '待确认',
          paid: '已支付',
          lossWaitHandle: '待处理',
          finish: '已完成'
        },
        receptionType: {
          byYourself: '自主入住',
          byGuide: '接引用户'
        },
        avatar: sessionStorage.huhu_avatar,
        rejTimes: sessionStorage.huhu_rej,
        serTimes: sessionStorage.huhu_ser,
        maName: sessionStorage.huhu_name,
        popupVisible: false,
        src: ''
      }
    },
    mounted () {
      this.getDays()
      this.getTodayTime()
    },
    created () {
      this.getOrderInfo(this.$route.params.orderId)
    },
    methods: {
      getOrderInfo (id) {
        let vm = this
        Indicator.open()
        Axios.get('http://a.com/api/order/findOrder/' + id, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-token': localStorage.token
          }
        })
          .then(function (data) {
            const dt = data.data
            if (dt.message === 'isOk') {
              vm.orderInfo = dt.data
            } else {
              Toast({
                message: dt.message,
                position: 'bottom',
                duration: 2000
              })
            }
            Indicator.close()
          })
          .catch(function () {
            Toast({
              message: '订单信息错误，请稍后重试',
              position: 'bottom',
              duration: 2000
            })
            Indicator.close()
          })
      },
      extraFee (total) {
        if (total.length === 1) return total[0].itemAmount
        return total.reduce((x, y) => {
          return x.itemAmount + y.itemAmount
        })
      },
      // 切割图片路径
      piclist (list) {
        let imgList = list.split(',')
        return imgList.map((img) => img.replace(/(^\s*)/g, ''))
      },
      // 页面跳转
      push () {
        let vm = this
        vm.$router.push({
          name: 'orderTrack',
          params: {orderType: vm.$route.params.orderType, orderId: vm.$route.params.orderId}
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
      showImgDetails (src) {
        let vm = this
        vm.src = src
        vm.popupVisible = !vm.popupVisible
      }
    },
    computed: {
      // 计算星级
      starLevel () {
        if (!sessionStorage.huhu_starLevel) return 0
        return sessionStorage.huhu_starLevel * 15
      },
      appendOrder () {
        if (!sessionStorage.huhu_appendOrder) {
          return undefined
        }
        console.log(JSON.parse(sessionStorage.huhu_appendOrder))
        return JSON.parse(sessionStorage.huhu_appendOrder)
      }
    },
    components: {
      mtHeader: Header,
      Toast,
      Cell,
      Popup,
      appendOrder,
      Indicator
    },
    beforeRouteLeave (to, from, next) {
      Promise.resolve(
        next()
      )
        .then(() => {
          sessionStorage.removeItem('huhu_name')
          sessionStorage.removeItem('huhu_rej')
          sessionStorage.removeItem('huhu_ser')
          sessionStorage.removeItem('huhu_avatar')
          sessionStorage.removeItem('huhu_appendOrder')
        })
    }
  }

</script>

<style scoped>
  #order-info {
    width: 100vw;
    height: 100vh;
    background-color: #fff;
  }
  #order-info .details {
    position: fixed;
    z-index: 100;
    top: 40px;
    bottom: 0;
    overflow: scroll;
  }
  #order-info .mint-cell-value span{
    margin-right: 30px;
    font-size: 12px;
  }
  #order-info .order-status {
    color: #888;
    font-size: 14px;
  }
  #order-info .order-status span {
    margin-left: 20px;
  }
  #order-info .address {
    margin: 0;
    padding: 10px 30px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    font-size:14px;
    line-height: 25px;
  }
  #order-info .address span:last-child {
    font-size: 12px;
    color: #888;
  }
  #order-info .customer-info, #order-info .order-fee, #order-info .exta-service, #order-info .penalty{
    padding: 0 30px;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
  }
  #order-info .customer-info p, .order-fee p,#order-info .exta-service p{
    margin: 5px 0;
    font-size: 13px;
    line-height: 25px;
  }
  #order-info .customer-info p:first-child {
    padding: 5px 0;
  }
  #order-info .customer-info p:first-child{
    border-bottom: 1px solid #ddd;
  }
  #order-info .customer-info p span:nth-child(2n+1), #order-info .exta-service p span:nth-child(2n+1){
    display: inline-block;
    width: 50%;
  }
  #order-info .order-fee p{
    font-size: 12px;
  }
  #order-info .order-fee span:nth-child(2n+1){
    display: inline-block;
    width: 70%;
  }
  #order-info .order-time {
    margin: 0;
    padding: 15px 30px;
    font-size: 12px;
    line-height: 25px;
    color: #888;
  }
  #order-info .manager {
    padding: 10px 30px 0;
    border-bottom: 1px solid #ddd;
  }
  #order-info .manager img {
    float: left;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 20px;
  }
  #order-info .manager p {
    display: table-cell;
    line-height: 20px;
    font-size: 12px;
    word-spacing: 30px;
    padding-bottom: 10px;
  }
  #order-info .vip {
    margin-right: 3px;
    width: 13px;
    height: 12px;
  }
  #order-info .remake-order {
    outline: none;
    border: none;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 40px;
    font-size: 13px;
    background-color: #74a92e;
    color: #fff;
  }
  #order-info .star-level{
    background: url("../../../assets/images/星级@2x.png") no-repeat left top;
    background-size: 75px;
  }
  #order-info .penalty {
    border-top: 5px solid #ededed;
  }
  #order-info .penalty section {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
  }
  #order-info .penalty img {
    width: 60px;
    height: 60px;

  }
  #order-info .penalty h3 {
    font-size: 14px;
    margin: 8px 0;
  }
  #order-info .penalty p {
    font-size: 14px;
    line-height: 35px;
    border-top: 1px solid #ededed;
  }
  #order-info .penalty span {
    float: right;
    color: red;
  }
  #order-info .mint-popup {
    width: 100%;
  }
</style>
