<template>
  <div id="processing">
    <div class="wrapper" v-if="orderInfos.length !== 0">
      <section v-for="(infos, index) in orderInfos" class="processing-order">
        <p class="customer">
          <img :src="'http://139.224.238.161:9999'+infos.housekeeper.avatar" alt="avatar">
          <span>{{infos.housekeeper.name}}</span>
          <span class="time">{{orderTime(infos.orderInfo.createTime)}}</span>
        </p>
        <order-main :infos="infos"></order-main>
        <div class="order-handle">
          <mt-button size="small"
                     v-if="infos.orderInfo.orderStatus === 'paid'"
                     @click="cancel(infos.orderInfo.orderId, index)">取消</mt-button>
          <mt-button size="small"
                     v-else-if="infos.orderInfo.orderStatus === 'waitPay'"
                     @click="confirm(infos.orderInfo.orderId, 2)">支付</mt-button>
          <mt-button size="small" v-else
                     @click="confirm(infos.orderInfo.orderId, 2)">确定</mt-button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import Axios from 'axios'
  import orderMain from './order-main.vue'
  import {Button, Toast, MessageBox} from 'mint-ui'
  export default {
    name: 'processing',
    data () {
      return {
        orderInfos: []
      }
    },
    mounted () {
      this.getOrderList(1)
    },
    components: {
      orderMain,
      mtButton: Button,
      Toast,
      MessageBox
    },
    methods: {
      getOrderList (page) {
        let vm = this
        Axios.get('/api/order/findOrders/landlord/processing/10/' + page, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-token': localStorage.token
          }
        })
          .then(function (data) {
            const dt = data.data
            if (dt.message === 'isOk') {
              vm.orderInfos = dt.data.list
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
      },
      // 计算订单有效时间
      orderTime (time) {
        let timeDis = ((new Date()).getTime() / 1000 - time) / 60
        if (timeDis > 15) return
        return '剩余' + parseInt(15 - timeDis) + '分钟'
      },
      confirm () {

      },
      cancel (orderId, index) {
        MessageBox.confirm('确定取消订单?', '').then(action => {
          let vm = this
          Axios.post('/api/order/landlordCancelOrder/' + orderId, {}, {
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
                  message: '订单已取消',
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
      }
    }
  }
</script>

<style>
  #processing {
    width: 100%;
  }
  #processing .processing-order {
    padding:10px 15px 20px;
    margin: 10px 15px;
    border: 1px solid #ededed;
    border-radius: 4px;
    font-size: 12px;
  }
  #processing .customer {
    position: relative;
    border-bottom: 1px solid #ededed;
    margin-bottom: 15px;
  }
  #processing .customer img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 20px;
    margin-bottom: 4px;
    vertical-align: middle;
  }
  #processing .time{
    position: absolute;
    top: 0;
    right: 0;
    padding-top: 25px;
    background: url('../../../assets/images/时间@2x.png') no-repeat top right;
    background-size: 20px;
    color: #74a92e;
    transform: scale(.8);
  }
</style>
