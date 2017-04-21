<template>
  <div id="onorder">
    <mt-header title="待确认">
      <router-link to="/home" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div v-for="infos in houseInfos" class="orderlist">
      <section class="order">
        <div class="house-info">
          <h3>{{infos.houseInfo.address}}</h3>
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
            <span>&yen; {{infos.orderInfo.serviceFee+'.00'}}</span></br>
            <span v-html="setAward(infos.orderInfo.award)"></span>
          </div>
        </div>
        <p class="remark">还没有人抢单哟，要不要打赏管家呢</p>
        <div class="order-handle">
          <mt-button size="small" @click="award(infos.orderInfo.orderId)">打赏</mt-button>
          <mt-button size="small">取消</mt-button>
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
  import {Header, Button, Toast, Picker, Popup} from 'mint-ui'
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
        awardFee: 0
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
        return '剩余' + parseInt(16 - timeDis) + '分钟'
      },
      setAward (award) {
        let vm = this
        if (vm.awardFee !== 0) {
          return `打赏 &yen; ${vm.awardFee}.00`
        }
        if (award === 0) return
        vm.awardFee = award
        return `打赏 &yen; ${award}.00`
      },
      award (id) {
        let vm = this
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
        Axios.post('/api/order/orderAward/' + vm.selectedId + '/' + vm.selected, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-token': localStorage.token
          }
        })
          .then(function (data) {
            const dt = data.data
            if (dt.message === 'isOk') {
              vm.awardFee += parseInt(vm.selected)
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
      }
    },
    computed: {
      awardList () {
        let arr = []
        for (let i = 1; i < 34; i++) {
          arr.push(i * 3)
        }
        console.log(arr)
        return arr
      }
    },
    components: {
      mtHeader: Header,
      mtButton: Button,
      Picker,
      Popup
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
  #onorder .order {
    padding: 20px 10px 20px;
    background: url('../../assets/images/待确认背景图@2x.png') no-repeat top center;
    background-size: 100% 120%;
  }
  #onorder .order .time{
    position: absolute;
    top: 0;
    right: 0;
    padding-top: 25px;
    background: url('../../assets/images/时间@2x.png') no-repeat top right;
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
  }
  #onorder .order-handle{
   text-align: right;
    margin-top: 25px;
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

</style>
