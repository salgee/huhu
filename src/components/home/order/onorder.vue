<template>
  <div id="onorder">
    <mt-header title="待确认">
      <router-link to="/home" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="orderlist" >
      <section v-for="(infos,index) in houseInfos" :key="index" ref="infos.orderInfo.orderId" class="order">
        <router-link tag="div"
                     :to="{name: 'orderInfo', params: {orderType: 'onOrder', orderId: infos.houseInfo.orderId}}"
                     class="order-info" >
          <order-main :infos="infos"></order-main>
          <p v-if="!infos.housekeepers" class="remark">还没有人抢单哟，要不要打赏管家呢</p>
          <div class="order-handle">
            <mt-button v-if="!infos.housekeepers" size="small"
                       @click.stop="award(infos.orderInfo.orderId, index)">
              打赏</mt-button>
            <mt-button size="small"
                       @click.stop="cancelOrder(infos.orderInfo.orderId, index)">取消</mt-button>
          </div>
        </router-link>
        <div v-for="customer in infos.housekeepers" class="customer">
          <img :src="'http://139.224.238.161:9999'+customer.avatar" alt="avator">
          <span class="name">{{customer.name}}</span>
          <p>
            <span>星级: {{customer.starLevel}}</span>
            <span>服务次数: {{customer.serviceTimes}}</span>
            <span>拒单率: {{customer.rejectRate + '%'}}</span>
          </p>
          <div class="order-handle">
            <mt-button size="small"
                       @click="confirm(infos.orderInfo.orderId, customer.id)">
              确定</mt-button>
          </div>
        </div>
      </section>
      <mt-popup
        v-model="popupVisible"
        position="bottom">
        <mt-picker
          :slots="slots"
          :showToolbar=true
          :visibleItemCount=3
          @change="onValuesChange">
          <div class="title">
            <span @click="popupVisible=false">取消</span>
            <span @click="saveAward">确定</span>
          </div>
        </mt-picker>
      </mt-popup>
    </div>
  </div>
</template>

<script>
  import Axios from 'axios'
  Axios.defaults.baseURL = 'http://a.com'
  import {Header, Button, Toast, Picker, Popup, MessageBox} from 'mint-ui'
  import orderMain from './order_main.vue'
  export default {
    name: 'onorder',
    mounted () {
      this.getOrderList(this.page)
    },
    data () {
      return {
        page: 1,
        houseInfos: [],
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center',
            defaultIndex: 1
          }
        ],
        popupVisible: false,
        selected: '',
        selectedId: '',
        awardFee: 0,
        index: ''
      }
    },
    methods: {
      getOrderList (page) {
        let vm = this
        Axios.get('/api/order/findOrders/landlord/waitConfirm/10/' + page, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-token': localStorage.token
          }
        })
          .then(function (data) {
            const dt = data.data
            if (dt.message === 'isOk') {
              vm.houseInfos = dt.data.list
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
      award (id, index) {
        console.log(index)
        let vm = this
        vm.index = index
        vm.slots[0].values = vm.awardList
        vm.popupVisible = true
        vm.selectedId = id
      },
      onValuesChange (picker, values) {
        this.selected = values[0]
      },
      // 请求打赏接口
      saveAward () {
        let vm = this
        Axios.post('/api/order/orderAward/' + vm.selectedId + '/' + vm.selected, {}, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-token': localStorage.token
          }
        })
          .then(function (data) {
            const dt = data.data
            if (dt.message === 'isOk') {
              vm.houseInfos[vm.index].orderInfo.award += vm.selected
              vm.houseInfos[vm.index].orderTotalAmount += vm.selected
              Toast({
                message: '打赏成功',
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
        vm.popupVisible = false
      },
      // 取消订单
      cancelOrder (orderId, index) {
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
                vm.houseInfos.splice(index, 1)
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
      confirm (orderId, id) {
        console.log(orderId, id)
        this.$router.push({name: 'orderToConfirm', params: {orderId: orderId, id: id}})
      }
    },
    computed: {
      awardList () {
        let arr = []
        for (let i = 1; i < 34; i++) {
          arr.push(i * 3)
        }
        return arr
      }
    },
    components: {
      mtHeader: Header,
      mtButton: Button,
      Picker,
      Popup,
      MessageBox,
      orderMain
    }
  }
</script>

<style scoped>
  #onorder .mint-popup {
    width: 100%;
  }
  #onorder .title {
    overflow: hidden;
    padding: 10px;
    border: 1px solid #ddd;
  }
  #onorder .title span:first-child,#onorder .title span:last-child{
    float: left;
    font-size: 16px;
    color: royalblue;
  }
  #onorder .title span:last-child{
    float: right;
  }
  #onorder{
   width: 100vw;
   height: 100vh;
  }
  #onorder .orderlist{
    padding: 10px;
    font-size: 12px;
  }
  #onorder .order-info {
    padding: 20px 10px 20px;
    background: url('../../../assets/images/待确认背景图@2x.png') no-repeat top center;
    background-size: 100% 120%;
  }
  #onorder .remark {
    color: #74a92e;
    margin-bottom: 25px;
  }
  #onorder .order-handle{
   text-align: right;
  }
  #onorder .order-handle button{
    font-size: 12px;
    margin-left: 10px;
    padding: 0 24px;
    height: 26px;
  }
  #onorder .order-handle button:first-child {
    border: 2px solid #74a92e;
    color: #74a92e;
  }
  #onorder .order-handle button:last-child {
    background-color: #74a92e;
    color: #fff;
  }
  #onorder .customer {
    margin: 8px 0 4px;
    padding: 20px 10px;
    background: url("../../../assets/images/待确认背景图2@2x.png");
  }
  #onorder .customer img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 20px;
    vertical-align: middle;
  }
  #onorder .customer p {
    margin: 15px 0;
  }
  #onorder .customer span{
    display: inline-block;
    width: 30%;
    vertical-align: middle;
    font-size: 14px;
  }
</style>
