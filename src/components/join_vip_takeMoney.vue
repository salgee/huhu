<template>
  <div id="takeMoney">
    <mt-header title="押金支付">
      <mt-button icon="back" slot="left" @click="goVip"></mt-button>
    </mt-header>
    <p>支付押金<span>{{money}}</span></p>
    <div class="pay-for">
      <h3>选择支付方式</h3>
      <mt-cell>
        <span class="title" slot="title">余额</span>
        <input type="radio" id="balance" v-model="pay" name="pay"  value="ba">
        <label for="balance"></label>
        <img slot="icon" src="../assets/images/余额@2x.png" width="20" height="16">
      </mt-cell>
      <mt-cell title="微信">
        <span class="title" slot="title">微信</span>
        <input type="radio" v-model="pay" id="we" name="pay" value="we">
        <label for="we"></label>
        <img slot="icon" src="../assets/images/微信@2x.png" width="20" height="16">
      </mt-cell>
      <div class="submit">
        <mt-button type="danger" size="large" @click="payFor">提交</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {Cell, Radio, Button, Toast} from 'mint-ui'
  import Axios from 'axios'
  Axios.defaults.baseURL = 'http://a.com'
  Axios.defaults.headers = {
    'Content-Type': 'application/json',
    'x-api-token': localStorage.token
  }
  export default{
    name: 'payFor',
    mounted () {
      let vm = this
      Axios.get('/api/manage/product/detail/houseForegift/310000/310100/1')
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
    data () {
      return {
        pay: 'ba',
        money: ''
      }
    },
    methods: {
      goVip: function () {
        window.history.go(-1)
      },
      payFor () {

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
    margin-left: 10px;
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
    bottom: 60px;
    right: 0;
    left: 0;
    margin: auto;
    width: 80%;
    text-align: center;
  }
  .submit button{
    background-color: #79ac36;
    box-shadow: 0 4px 0 -1px #ddd;
  }
</style>
