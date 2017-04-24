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
          <div class="house-info">
            <h3>{{infos.houseInfo.address+infos.houseInfo.buildingNo}}</h3>
            <span>{{infos.houseInfo.orderId}}</span>
            <div class="time">{{orderTime(infos.orderInfo.createTime)}}</div>
          </div>
          <div class="info">
            <p>
              <span>接待方式：{{receptionType[infos.orderInfo.receptionType]}}</br></span>
              <span v-if="infos.orderInfo.receptionType === 'byGuide'">接引时间：{{infos.orderInfo.receptionTimeFromStr}}</br></span>
              <span>清洁时间：{{infos.orderInfo.serviceTimeFromStr}}</span>
            </p>
            <div class="fee">
              <span>&yen; {{infos.orderTotalAmount.toFixed(2)}}</span></br>
              <span v-if="infos.orderInfo.award!==0">{{'打赏 &yen; '+infos.orderInfo.award+'.00'}}</span>
            </div>
          </div>
          <p v-if="!infos.housekeepers" class="remark">还没有人抢单哟，要不要打赏管家呢</p>
          <div class="order-handle">
            <mt-button v-if="!infos.housekeepers" size="small" @click.stop="award(infos.orderInfo.orderId, index)">打赏</mt-button>
            <mt-button size="small" @click.stop="cancelOrder(infos.orderInfo.orderId, index)">取消</mt-button>
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
            <mt-button size="small" @click="confirm(infos.orderInfo.orderId, customer.id)">确定</mt-button>
          </div>
        </div>
        <mt-button size="small" @click="confirm(infos.orderInfo.orderId, 2)">确定</mt-button>
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
  export default {
    name: 'onorder',
    mounted () {
      this.getOrderList(this.page)
    },
    data () {
      return {
        page: 1,
        houseInfos: [],
        receptionType: {
          byYourself: '自主入住',
          byGuide: '接引用户'
        },
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
      // 计算订单有效时间
      orderTime (time) {
        let timeDis = ((new Date()).getTime() / 1000 - time) / 60
        return '剩余' + parseInt(15 - timeDis) + '分钟'
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
        MessageBox.confirm('确定执行此操作?', '').then(action => {
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
      MessageBox
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
  #onorder .orderlist h3{
   font-size: 12px;
   font-weight: normal;
   margin: 0;
   margin-bottom: 10px;
  }
  #onorder .house-info {
   position: relative;
  }
  #onorder .house-info span{
   color: #adadad;
  }
  #onorder .order-info {
    padding: 20px 10px 20px;
    background: url('../../../assets/images/待确认背景图@2x.png') no-repeat top center;
    background-size: 100% 120%;
  }
  #onorder .order .time{
    position: absolute;
    top: 0;
    right: 0;
    padding-top: 25px;
    background: url('../../../assets/images/时间@2x.png') no-repeat top right;
    background-size: 20px;
    color: #74a92e;
    transform: scale(.8);
  }
  #onorder .info {
   position: relative;
   margin: 16px 0;
  }
  #onorder .info p {
   margin: 0;
   line-height: 25px;
  }
  #onorder .info .fee{
   position: absolute;
   top: 0;
   right: 0;
   line-height: 22px;
   text-align: right;
  }
  #onorder .info .fee span{
   font-size: 14px;
   color: red;
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
  #onorder .customer span{
    display: inline-block;
    width: 30%;
    vertical-align: middle;
    font-size: 14px;
  }
</style>
