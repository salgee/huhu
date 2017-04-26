<template>
  <div id="cancel">
    <div class="wrapper" v-if="orderInfos.length !== 0">
      <section v-for="(infos, index) in orderInfos" :key="infos.orderInfo.id" class="cancel-order"
        @click=pushDetails(infos)>
        <order-main :infos="infos">
          <div slot="delete" class="delete" @click.stop="deleteOrder(infos.orderInfo.orderId, index)"></div>
        </order-main>
        <div class="order-handle">
          <span v-if="infos.housekeeper" class="remark">订单未支付</span>
          <span v-else class="remark">{{remark}}</span>
          <mt-button size="small" @click.stop="remakeOrder(infos.orderInfo.orderId, index)">再次派单</mt-button>
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
    name: 'cancel',
    data () {
      return {
        orderInfos: [],
        remark: '未被抢单'
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
        Axios.get('/api/order/findOrders/landlord/cancel/10/' + page, {
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
      remakeOrder () {

      },
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
          sessionStorage.huhu_avatar = 'http://139.224.238.161:9999' + infos.housekeeper.avatar
        } else {
          sessionStorage.removeItem('huhu_avatar')
        }
        this.$router.push({name: 'orderInfo', params: {orderType: 'cancel', orderId: infos.orderInfo.orderId}})
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
