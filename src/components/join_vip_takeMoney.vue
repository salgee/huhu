<template>
  <div id="takeMoney">
    <mt-header title="押金支付">
      <mt-button icon="back" slot="left" @click="goVip"></mt-button>
    </mt-header>
    <p>支付押金<span>{{money}}</span></p>
    <div class="pay-for">
      <h3>选择支付方式</h3>
      <mt-cell title="微信">
        <span class="title" slot="title">微信</span>
        <input type="radio" v-model="pay" id="we" name="pay" checked="checked" disabled value="we">
        <label for="we"></label>
        <img slot="icon" src="../assets/images/微信@2x.png" width="20" height="16">
      </mt-cell>
      <div class="submit">
        <mt-button type="danger" size="small" @click="payFor">立即支付</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {Cell, Radio, Button, Toast} from 'mint-ui'
  import Axios from 'axios'
//  import wx from 'weixin-js-sdk'
  Axios.defaults.baseURL = 'http://a.com'
  export default{
    name: 'payFor',
    mounted () {
      Axios.defaults.headers = {
        'Content-Type': 'application/json',
        'x-api-token': localStorage.token
      }
      // 请求支付押金
      this.getFee()
      // 请求余额
      this.getBalance()
    },
    data () {
      return {
        pay: 'we',
        money: '',
        balance: ''
      }
    },
    methods: {
      goVip: function () {
        window.history.go(-1)
      },
      getFee () {
        let vm = this
        Axios.get(`/api/manage/product/detail/houseForegift/${sessionStorage.huhu_province}/${sessionStorage.huhu_city}/${sessionStorage.huhu_bedNum}`)
          .then(function (data) {
            let dt = data.data
            if (dt.message === 'isOk') {
              vm.money = data.data.data + '元'
            } else {
              vm.money = '金额请求失败，请重试'
              Toast({
                message: dt.message,
                position: 'bottom',
                duration: 1500
              })
            }
          })
          .catch(function () {
            vm.money = '金额请求失败，请重试'
            Toast({
              message: '请求错误，请稍后重试',
              position: 'bottom',
              duration: 1500
            })
          })
      },
      getBalance () {
        let vm = this
        Axios.get('/api/customer/landlord')
          .then(function (data) {
            vm.balance = parseFloat(data.data.data.balance).toFixed(2) + '元'
          })
          .catch(function (e) {
            Toast({
              message: '请求错误，请稍后重试',
              position: 'bottom',
              duration: 1500
            })
          })
      },
      payFor () {
        let vm = this
        if (vm.pay === 'we') {
          Axios.post('/api/pay/weixin/house-foregift',
            {
              price: sessionStorage.huhu_bedNum,
              houseId: sessionStorage.huhu_key,
              payType: 'payHouseForegift'
            }).then((data) => {
              if (data.data.message === 'isOk') {
                vm.weixin(data.data.data)
              } else {
                Toast({
                  message: '请求错误，请稍后重试',
                  position: 'bottom',
                  duration: 1500
                })
              }
            })
        } else {
          Toast({
            message: '请求错误，请刷新页面',
            position: 'bottom',
            duration: 1500
          })
        }
      }
    },
    components: {
      Cell,
      Radio,
      mtButton: Button
    },
    computed: {
    }
  }
</script>
<style scoped>
  #takeMoney{
    width: 100vw;
    height: 100vh;
    background-color: #ededed;
  }
  .mint-header{
    background: #74a92e!important;
  }
  #takeMoney p span {
    float: right;
    color: red;
  }
  p {
    margin: 10px 0;
    padding: 15px;
    font-size: 12px;
    background-color: #fff;
  }
  .pay-for {
    background-color: #fff;
    padding-left: 10px;
    border: 1px solid transparent;
  }
  .pay-for h3{
    font-size: 12px;
    font-weight: normal;
    padding-left: 10px;
    color: #74a92e;
  }
  .pay-for .mint-cell span {
    font-size: 12px;
    margin: 0 10px;
  }
  .pay-for .mint-cell input{
    display: none;
  }
  .pay-for .mint-cell label{
    position: relative;
  }
  .pay-for .mint-cell label::before {
    content: '';
    width: 12px;
    height: 12px;
    display: block;
    border: 1px solid #adadad;
  }
  .pay-for .mint-cell input:checked+label::after {
    position: absolute;
    top: 0;
    content: '';
    width: 10px;
    height: 4px;
    display: block;
    border: 2px solid transparent;
    border-bottom-color: #74a92e;
    border-left-color: #74a92e;
    transform: rotate(-45deg);
  }
  .submit {
    position: absolute;
    bottom: 150px;
    right: 0;
    left: 0;
    margin: auto;
    width: 80%;
    text-align: center;
  }
  .submit button{
    width: 80%;
    font-size: 12px;
    background-color: #79ac36;
    box-shadow: 0 4px 0 -1px #ddd;
  }
</style>
