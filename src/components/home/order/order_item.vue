<template>
  <section v-if="deleteOrder === true"
           @click=pushDetails(infos)>
    <div class="order-item">
      <p class="customer">
        <img :src="'http://139.224.238.161:9999'+infos.housekeeper.avatar" alt="avatar">
        <section>
          <span>{{infos.housekeeper.name}}</span>
          <span class="star-level" :style="{ 'padding-left': starLevel(infos.housekeeper.starLevel) + 'px' }"></span>
        <span class="time"
        v-if="infos.orderInfo.orderStatus === 'waitPay'">
          {{orderTime(infos.waitPayTime)}}</span>
        </section>
        <slot name="commit"></slot>
      </p>
      <order-main :infos="infos"></order-main>
      <div class="order-handle">
        <mt-button size="small"
                   v-if="infos.orderInfo.orderStatus === 'paid'"
                   @click.stop="cancel(infos.orderInfo.orderId, index, infos)">取消</mt-button>
        <mt-button size="small"
                   v-else-if="infos.orderInfo.orderStatus === 'waitPay'"
                   @click.stop="confirm(infos.orderInfo.orderId, index)">支付</mt-button>
        <slot name="reOrder"></slot>
      </div>
    </div>
    <slot name="appendOrder"></slot>
  </section>
</template>

<script>
  import Axios from 'axios'
  import orderMain from './order_main.vue'
  import {Button, MessageBox, Toast} from 'mint-ui'
  export default {
    name: 'order-item',
    props: {
      infos: {
        type: Object,
        required: true
      },
      index: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        deleteOrder: true
      }
    },
    components: {
      orderMain,
      mtButton: Button,
      MessageBox,
      Toast
    },
    methods: {
      // 计算订单有效时间
      orderTime (time) {
        return '剩余' + Math.ceil(time / 60) + '分钟'
      },
      confirm () {

      },
      cancel (orderId, index, infos) {
        let vm = this
        let msg = ''
        const sureAppend = infos.orderInfo.receptionTimeFrom ? infos.orderInfo.receptionTimeFrom : infos.orderInfo.serviceTimeFrom
        const timeDis = sureAppend - new Date().getTime() / 1000
        if (timeDis > 12 * 60 * 60) {
          msg = '确定取消订单?'
        } else if (timeDis < 2 * 60 * 60) {
          msg = '现在取消订单，将不会返回押金'
        } else {
          msg = '现在取消订单，将会扣除20%的费用'
        }
        MessageBox.confirm(msg, '').then(action => {
          Axios.post('/api/order/landlordCancelOrder/' + orderId, {}, {
            headers: {
              'Content-Type': 'application/json',
              'x-api-token': localStorage.token
            }
          })
            .then(function (data) {
              const dt = data.data
              if (dt.message === 'isOk') {
                vm.deleteOrder = false
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
      },
      pushDetails (infos) {
        let vm = this
        sessionStorage.huhu_appendOrder = JSON.stringify(infos.appendOrders)
        sessionStorage.huhu_name = infos.housekeeper.name || ''
        sessionStorage.huhu_rej = infos.housekeeper.rejectTimes || 0
        sessionStorage.huhu_ser = infos.housekeeper.serviceTimes || 0
        sessionStorage.huhu_avatar = 'http://139.224.238.161:9999' + infos.housekeeper.avatar
        sessionStorage.huhu_starLevel = infos.housekeeper.starLevel || 0
        vm.$router.push({name: 'orderInfo', params: {orderType: vm.$route.name, orderId: infos.orderInfo.orderId}})
      },
      // 计算星级
      starLevel (level) {
        return level * 15
      }
    }
  }
</script>

<style scoped>
   {
    position: fixed;
    top: 75px;
    bottom: 56px;
    width: 100%;
    overflow: scroll;
  }
   .order-item {
    padding:10px 15px 20px;
    margin: 10px 15px;
    border: 1px solid rgba(116,169,46,.4);
    border-radius: 4px;
    font-size: 12px;
  }
   .customer {
    position: relative;
    border-bottom: 1px solid #ededed;
    margin-bottom: 15px;
    overflow: hidden;
  }
   .customer section {
    display: table-cell;
    line-height: 20px;
    vertical-align: middle;
    padding-top: 3px;
  }
   .customer img{
    float: left;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 20px;
    margin-bottom: 4px;
    vertical-align: middle;
  }
   .time{
    position: absolute;
    top: 0;
    right: 0;
    padding-top: 25px;
    background: url('../../../assets/images/时间@2x.png') no-repeat top right;
    background-size: 20px;
    color: #74a92e;
    transform: scale(.8);
  }
   .star-level{
    background: url("../../../assets/images/星级@2x.png") no-repeat left top;
    background-size: 75px;
  }
  .commit {
    position: absolute;
    top: 4px;
    right: 0;
  }
</style>
