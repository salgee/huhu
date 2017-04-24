<template>
  <div v-if="orderInfo.orderInfo !==undefined" id="order-info">
    <mt-cell to="/home">
      <p slot="title" class="order-status">
        <span>订单状态</span>
        <span style="color: #74a92e;">{{orderStatus[orderInfo.orderInfo.orderStatus]}}</span>
      </p>
      <span>订单跟踪</span>
      <img src="../../../assets/images/返回@2x.png" width="8" height="14">
    </mt-cell>
    <p class="address">
      <span>{{orderInfo.houseInfo.address+orderInfo.houseInfo.buildingNo}}</span></br>
      <span>订单编号： {{orderInfo.orderInfo.orderId}}</span>
    </p>
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
        <span style="color: #888">{{orderInfo.orderInfo.serviceFee}}</span>
        <span>实付款</span>
        <span style="color: red">{{orderInfo.orderInfo.totalAmount}}</span>
      </p>
    </section>
    <p class="order-time">
      <span>下单时间： {{orderInfo.orderInfo.createTimeStr}}</span>
    </p>
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
          news: '待确认'
        },
        receptionType: {
          byYourself: '自主入住',
          byGuide: '接引用户'
        }
      }
    },
    created () {
      this.getOrderInfo(this.$route.params.orderId)
    },
    methods: {
      getOrderInfo (id) {
        let vm = this
        Axios('http://a.com/api/order/findOrder/' + id)
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
    border-bottom: 1px solid #ddd;
  }
</style>
