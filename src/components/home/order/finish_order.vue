<template>
  <div id="processing">
    <div class="wrapper" v-if="orderInfos.length !== 0">
      <orderItem
        v-for="(infos, index) in orderInfos"
        key="infos.orderInfo.id"
        :infos="infos"
      >
        <mt-button slot="commit" class="commit">评价</mt-button>
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

