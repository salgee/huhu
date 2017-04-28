<template>
  <div id="processing">
    <div class="wrapper" v-if="orderInfos.length !== 0">
      <orderItem
        v-for="(infos, index) in orderInfos"
        key="infos.orderInfo.id"
        :infos="infos"
      >
        <mt-button slot="commit" class="commit" @click.stop="goEvaluate(infos)">评价</mt-button>
      </orderItem>
    </div>
  </div>

</template>

<script>
  import Axios from 'axios'
  import orderItem from './order_item.vue'
  import {Toast, Indicator} from 'mint-ui'
  export default {
    name: 'finish',
    data () {
      return {
        orderInfos: []
      }
    },
    mounted () {
      this.getOrderList(1)
    },
    components: {
      Toast,
      orderItem,
      Indicator
    },
    methods: {
      goEvaluate: function (infos) {
        let that = this
        console.log(infos)
        Promise.resolve(
//          订单号
          sessionStorage.evaluateUseOrderId = infos.orderInfo.orderId,
//          服务人员id
          sessionStorage.evaluateUseHousekeeperId = infos.orderInfo.houseKeeperId,
//          管家名字
          sessionStorage.evaluateUseName = infos.housekeeper.name,
//          头像
          sessionStorage.evaluateUseAvatar = 'http://139.224.238.161:9999/' + infos.housekeeper.avatar,
//          星级
          sessionStorage.evaluateUseStarLevel = infos.housekeeper.starLevel,
//          服务次数
          sessionStorage.evaluateUseServiceTimes = infos.housekeeper.serviceTimes,
//          拒单率
          sessionStorage.evaluateUseRejectRate = infos.housekeeper.rejectRate
        ).then(
          () => {
            that.$router.push('/home/order/orderEvaluate')
          })
      },
      getOrderList (page) {
        let vm = this
        Axios.get('/api/order/findOrders/landlord/finish/10/' + page, {
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

