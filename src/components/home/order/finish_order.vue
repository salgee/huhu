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
      <div class="wrapper" v-if="orderInfos.length !== 0">
        <orderItem
          v-for="(infos, index) in orderInfos"
          key="infos.orderInfo.id"
          :infos="infos"
          :index="index"
        >
          <mt-button slot="commit" class="commit" @click.stop="goEvaluate(infos)">评价</mt-button>
        </orderItem>
      </div>
    </mt-loadmore>
    <div v-else class="default"></div>
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
        orderInfos: [],
        page: 1,
        allLoaded: false
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
          sessionStorage.evaluateUseAvatar = 'http://139.224.238.161:9997/' + infos.housekeeper.avatar,
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
        return Axios.get('/api/order/findOrders/landlord/finish/10/' + page, {
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

