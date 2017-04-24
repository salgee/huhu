<template>
  <div id="order-confirm">
    <mt-header title="订单确认" style="background: #79ac36;">
      <mt-button @click="$router.go(-1)" slot="left" icon="back"></mt-button>
    </mt-header>
    <div class="wrapper" v-if="orderInfo.orderInfo !==undefined">
      <section class="orderInfo">
        <P>
          <span>{{orderInfo.houseInfo.address+orderInfo.houseInfo.buildingNo}}</span></br>
          <span style="font-size: 12px; color: #888">订单编号： {{orderInfo.orderInfo.orderId}}</span>
        </P>
        <P>
          <span>接待方式： {{receptionType[orderInfo.orderInfo.receptionType]}}</span></br>
          <span>清洁时间： {{orderInfo.orderInfo.serviceTimeFromStr}}</span>
        </P>
      </section>
      <p class="price">
        服务价格：<span>{{orderInfo.orderInfo.serviceFee.toFixed(2)}}</span>
      </p>
      <p class="award"></p>
      <h3>给管家捎句话</h3>
      <textarea v-model="message"></textarea>
      <div class="confirm">
        <p>
          <span>合计：</span><span style="color: red;">&yen;{{orderInfo.orderInfo.totalAmount.toFixed(2)}}</span>
          <button>支付</button>
        </p>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
  import Axios from 'axios'
  Axios.defaults.baseURL = 'http://a.com'
  import {Header, Toast} from 'mint-ui'
  export default {
    name: 'app',
    data () {
      return {
        orderInfo: {},
        message: '',
        receptionType: {
          byYourself: '自主入住',
          byGuide: '接引用户'
        }
      }
    },
    mounted () {
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
      },
      deal () {
        let vm = this
        const orderId = vm.$route.params.orderId
        const id = vm.$route.params.id
        Axios.post(`/api/order/landlordConfirmOrder/${orderId}/${id}`)
          .then(function (data) {
            const dt = data.data
            if (dt.message === 'isOk') {
              vm.$router.push({name: '/home'})
            } else {
              Toast({
                message: dt.message,
                position: 'bottom',
                duration: 2000
              })
            }
          })
          .catch(function (err) {
            Toast({
              message: err,
              position: 'bottom',
              duration: 2000
            })
          })
      }
    },
    components: {
      mtHeader: Header,
      Toast
    }
  }
</script>

<style scoped>
  #order-confirm {
    width: 100vw;
    height: 100vh;
    background-color: #ededed;
  }
  #order-confirm .wrapper{
    padding: 0 10px;
  }
  #order-confirm .orderInfo {
    margin: 20px 0 10px;
    padding: 15px;
    background: url("../../../assets/images/订单确认背景@2x.png") no-repeat center top;
    background-size: 100%;
  }
  #order-confirm p {
    margin: 0;
  }
  #order-confirm .orderInfo p {
    margin-bottom: 10px;
    font-size: 13px;
    line-height: 25px;
  }
  #order-confirm .orderInfo p:first-child {
    font-size: 14px;
  }
  #order-confirm .price {
    padding: 15px;
    font-size: 12px;
    background-color: #fff;
  }
  #order-confirm .price span{
    color: red;
  }
  #order-confirm h3 {
    font-size: 13px;
    font-weight: normal;
    text-indent: 20px;
  }
  #order-confirm textarea{
    box-sizing: border-box;
    resize: none;
    padding: 5px;
    width: 100%;
    height: 80px;
    outline: none;
    border: none;
    font-size: 13px;
    text-indent: 13px;
  }
  #order-confirm .confirm {
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    line-height: 50px;
    text-indent: 20px;
    border-top: 1px solid #cdcdcd;
  }
  #order-confirm .confirm button {
    float: right;
    outline: none;
    border: none;
    width: 150px;
    height: 50px;
    background-color: #74a92e;
    color: #fff;
  }
</style>
