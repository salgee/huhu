<template>
  <div id="processing">
    <div class="wrapper" v-if="orderInfos.length !== 0">
      <orderItem
        v-for="(infos, index) in orderInfos"
        key="infos.orderInfo.id"
        :infos="infos"
      ></orderItem>
    </div>
  </div>
</template>

<script>
  import Axios from 'axios'
  import orderItem from './order_item.vue'
  import {Toast, Indicator} from 'mint-ui'
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
      Toast,
      orderItem,
      Indicator
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

<style>
  #processing {
    position: fixed;
    top: 75px;
    bottom: 56px;
    width: 100%;
    overflow: scroll;
  }
  #processing .processing-order {
    padding:10px 15px 20px;
    margin: 10px 15px;
    border: 1px solid rgba(116,169,46,.4);
    border-radius: 4px;
    font-size: 12px;
  }
  #processing .customer {
    border-bottom: 1px solid #ededed;
    margin-bottom: 15px;
    overflow: hidden;
  }
  #processing .customer section {
    display: table-cell;
    line-height: 20px;
    vertical-align: middle;
    padding-top: 3px;
  }
  #processing .customer img{
    float: left;
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
  #processing .star-level{
    background: url("../../../assets/images/星级@2x.png") no-repeat left top;
    background-size: 75px;
  }
</style>
