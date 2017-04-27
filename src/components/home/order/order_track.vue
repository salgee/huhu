<template>
    <div id="order-track">
      <mt-header title="订单追踪" style="background: #79ac36;">
        <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
      </mt-header>
      <section v-for="info in orderInfo">
        <div class="cycle">
        </div>
        <p class="order-info">
          <span>{{info.comment}}</span></br>
          <span>操作时间&nbsp;&nbsp;&nbsp;&nbsp;{{info.createTimeStr}}</span>
        </p>
      </section>
    </div>
</template>
<script>
  import Axios from 'axios'
  import {Header, Toast, Button} from 'mint-ui'
  export default{
    name: 'track',
    data () {
      return {
        orderInfo: {}
      }
    },
    mounted () {
      this.getOrderTrack()
    },
    methods: {
      getOrderTrack () {
        let vm = this
        Axios.get(`api/order/orderOperation/${vm.$route.params.orderId}`, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-token': localStorage.token
          }
        })
          .then((data) => {
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
      mtButton: Button,
      Toast,
      mtHeader: Header
    }
  }
</script>
<style scoped>
  #order-track{
    width: 100vw;
    min-height: 100vh;
  }
  #order-track section {
    position: relative;
    margin: 20px 30px 0;
  }
  #order-track section .cycle{
    width: 14px;
    height: 14px;
    background-color: #bdbdbd;
    border-radius: 50%;
    border: 1px solid #000;
    float: left;
    margin-right: 30px;
  }
  #order-track > section+section:before {
    content: '';
    width: 0;
    height: 37px;
    border: 1px dashed #000;
    position: absolute;
    top: -40px;
    left: 7px;
  }
  #order-track section .order-info {
    font-size: 12px;
    display: table-cell;
  }
  #order-track .order-info span:last-child {
    display: inline-block;
    margin-top: 10px;
    color: #bdbdbd;
  }
</style>
