<template>
  <div id="processing">
    <mt-loadmore
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      ref="loadmore"
      class="wrapper"
      :autoFill=false
      v-if="orderInfos.length !== 0">
      <order-item
        v-for="(infos, index) in orderInfos"
        key="infos.orderInfo.id"
        :infos="infos"
        :index="index">
        <mt-button v-if="isAppend(infos)" slot="reOrder" size="small" @click.stop>追加订单</mt-button>
        <append-order v-if="infos.appendOrders.length > 0"
                      slot="appendOrder"
                      :appendOrder = infos.appendOrders
                      :show=true></append-order>
      </order-item>
    </mt-loadmore>
    <div v-else class="default">没有订单</div>
  </div>
</template>

<script>
  import Axios from 'axios'
  import orderItem from './order_item.vue'
  import appendOrder from './append_order.vue'
  import {Toast, Indicator, Loadmore} from 'mint-ui'
  export default {
    name: 'processing',
    data () {
      return {
        orderInfos: [],
        page: 1,
        allLoaded: false,
        msg: '加载完成'
      }
    },
    mounted () {
      this.getOrderList(1)
    },
    components: {
      Toast,
      orderItem,
      Indicator,
      appendOrder,
      Loadmore
    },
    methods: {
      getOrderList (page) {
        let vm = this
        return Axios.get('/api/order/findOrders/landlord/processing/10/' + page, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-token': localStorage.token
          }
        })
          .then(function (data) {
            const dt = data.data
            if (dt.message === 'isOk') {
              if (page === 1) {
                vm.orderInfos = dt.data.list
              } else {
                vm.orderInfos = vm.orderInfos.concat(dt.data.list)
              }
              if (dt.data.list.length === 0) {
                vm.allLoaded = true
                vm.msg = '没有跟多订单了~~'
              }
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
      },
      // 通过vip身份和时间判断是否有追加订单的权限
      isAppend (infos) {
        if (infos.houseInfo.vip === 1) {
          const sureAppend = infos.orderInfo.receptionTimeFrom ? infos.orderInfo.receptionTimeFrom : infos.orderInfo.serviceTimeFrom
          const timeDis = sureAppend - new Date().getTime() / 1000
          if (timeDis > 12 * 60 * 60) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      },
      // 更新列表
      loadTop () {
        let vm = this
        vm.page = 1
        vm.getOrderList(1)
          .then(() => {
            Toast({
              message: '刷新成功',
              position: 'bottom',
              duration: 2000
            })
            vm.$refs.loadmore.onTopLoaded()
          })
      },
      // 加载更多
      loadBottom () {
        let vm = this
        vm.page += 1
        vm.getOrderList(vm.page)
          .then(() => {
            Toast({
              message: vm.msg,
              position: 'bottom',
              duration: 2000
            })
            vm.$refs.loadmore.onBottomLoaded()
          })
          .catch(() => {
            vm.$refs.loadmore.onBottomLoaded()
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
  #processing .default {
    width: 100%;
    height: 100%;
    background: url(../../../assets/images/activity_one_house.png) no-repeat center;
    background-size: 40%;
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
