<template>
  <div id="order-info">
    <mt-header title="订单详情" style="background: #79ac36;">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <div class="details" v-if="orderInfo.orderInfo !==undefined">
      <mt-cell to="/home">
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
      <section v-if="avatar !== ''" class="manager">
        <img :src="avatar" alt="avatar">
        <p>
          <span>gz</span></br>
          <span>服务次数：7次</span>
          <span>拒单率：1%</span>
        </p>
      </section>
      <section class="customer-info">
        <p>
          <span>入住人姓名</span><span>{{orderInfo.orderInfo.checkInPerson}}</span>
          <span>入住人电话</span><span>{{orderInfo.orderInfo.checkInPhone}}</span>
          <span>接待方式</span><span>{{receptionType[orderInfo.orderInfo.receptionType]}}</span></br>
        </p>
        <p>
          <span>清洁时间</span><span>{{orderInfo.orderInfo.serviceTimeFromStr}}</span>
        </p>
      </section>
      <section class="order-fee">
        <p>
          <span style="color: #888">服务费</span>
          <span style="color: #888">&yen; {{orderInfo.orderInfo.serviceFee.toFixed(2)}}</span>
          <span>实付款</span>
          <span style="color: red">&yen; {{orderInfo.orderInfo.totalAmount.toFixed(2)}}</span>
        </p>
      </section>
      <p class="order-time">
        <span>下单时间： {{orderInfo.orderInfo.createTimeStr}}</br></span>
        <span v-if="this.$route.params.orderType === 'cancel'">取消时间： {{orderInfo.orderInfo.cancelTimeStr}}</br></span>
        <span v-if="this.$route.params.orderType === 'processing'">确定时间： {{orderInfo.orderInfo.confirmTimeStr}}</span>
      </p>
      <button v-if="this.$route.params.orderType === 'cancel'" class="remake-order" @click="remakeOrder">
        再次派单
      </button>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
  import Axios from 'axios'
  import {Header, Toast, Cell} from 'mint-ui'
  export default {
    name: 'app',
    data () {
      return {
        orderInfo: {},
        orderStatus: {
          noPayCancel: '已取消',
          news: '待确认',
          paid: '已支付'
        },
        receptionType: {
          byYourself: '自主入住',
          byGuide: '接引用户'
        },
        avatar: sessionStorage.huhu_avatar || ''
      }
    },
    created () {
      this.getOrderInfo(this.$route.params.orderId)
    },
    methods: {
      getOrderInfo (id) {
        let vm = this
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
          })
          .catch(function () {
            Toast({
              message: '订单信息错误，请稍后重试',
              position: 'bottom',
              duration: 2000
            })
          })
      },
      remakeOrder () {
      }
    },
    components: {
      mtHeader: Header,
      Toast,
      Cell
    }
  }

</script>

<style scoped>
  #order-info {
    width: 100vw;
    height: 100vh;
  }
  #order-info .details {
    margin-bottom: 40px;
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
  #order-info .customer-info, .order-fee {
    padding: 0 30px;
    border-bottom: 1px solid #ddd;
  }
  #order-info .customer-info p, .order-fee p{
    margin: 0;
    padding: 15px 0;
    font-size: 13px;
    line-height: 25px;
  }
  #order-info .customer-info p:first-child{
    border-bottom: 1px solid #ddd;
  }
  #order-info .customer-info p span:nth-child(2n+1) {
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
    line-height: 40px;
    font-size: 12px;
    word-spacing: 30px;
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
</style>
