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
  Axios.defaults.headers = {
    'Content-Type': 'application/json',
    'x-api-token': localStorage.token
  }
  export default{
    name: 'payFor',
    mounted () {
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
//      weixin (dt) {
//        console.log(sha1)
//        Axios.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx612009b09a380c9b&secret=APPSECRET')
//          .then(function (data) {
//            console.log(data)
//          })
//        let string = `noncestr=${dt.noncestr}&timestamp=${dt.timestamp}&url=${window.encodeURIComponent(location.href.split('#')[0])}`
//        wx.config({
//          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//          appId: dt.appid, // 必填，公众号的唯一标识
//          timestamp: dt.timestamp, // 必填，生成签名的时间戳
//          nonceStr: dt.noncestr, // 必填，生成签名的随机串
//          signature: dt.sign, // 必填，签名，见附录1
//          jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//        })
//        wx.ready(function () {
//          console.log(12)
//          wx.chooseWXPay({
//            timestamp: dt.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
//            nonceStr: dt.noncestr, // 支付签名随机串，不长于 32 位
//            package: 'prepay_id=' + dt.prepay_id, // prepay_id，提交格式如：prepay_id=***）
//            signType: 'SHA1', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
//            paySign: dt.sign, // 支付签名
//            success: function (res) {`  `
//              // 支付成功后的回调函数
//              console.log(res, 1)
//            }
//          })
//          wx.error(function (res) {
//            console.log(res)
//          })
//        })
//        wx.checkJsApi({
//          jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
//          success: function (res) {
//            // 以键值对的形式返回，可用的api值true，不可用为false
//            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
//          }
//        })
//      }
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
