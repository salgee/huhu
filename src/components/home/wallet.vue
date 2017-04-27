<template>
  <div id="wallet">
    <mt-header title="钱包">
    </mt-header>
    <div class="walletFlex">
      <div class="walletBalance" style="border-right: 1px solid #6c9437"><div>账户余额</div><span>￥{{walletBalance}}</span></div>
      <div class="walletBalance"><div>押金余额</div><span>￥{{foregiftBalance}}</span></div>
      <span class="moneyBack">￥{{foregiftBack}}退押中</span>
    </div>
    <div class="ad" @click="goRecharge">充值有礼</div>
    <div class="tradeList">
      <div class="tradeTitle">交易记录</div>
      <div class="oneTradeList" v-for="transaction of transactions">
        <div>
          <div  style="font-size: 15px;padding-bottom: 10px;" v-if="transaction.transactionType === 'payHouseForegift'">支付房屋押金</div>
          <div  style="font-size: 14px;color: #9b9b9b;">{{transaction.createTimeStr}}</div>
        </div>
        <div style="font-size: 13px;color: red">-￥{{transaction.amount}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Axios from 'axios'
  Axios.defaults.baseURL = 'http://a.com'
  export default {
    name: 'wallet',
    mounted () {
      this.getWallet()
    },
    data () {
      return {
        walletBalance: '',
        foregiftBalance: '',
        foregiftBack: '',
        transactions: []
      }
    },
    methods: {
      goRecharge: function () {
        this.$router.push('/wallet/walletRecharge')
      },
      getWallet: function () {
        let that = this
        Axios.get('api/customer/landlordWallet', {headers: {
          'Content-Type': 'application/json',
          'x-api-token': localStorage.token
        }}).then(function (data) {
          that.walletBalance = Number(data.data.data.balance).toFixed(2)
          that.foregiftBalance = Number(data.data.data.forgift).toFixed(2)
          that.foregiftBack = Number(data.data.data.refunding).toFixed(2)
          that.transactions = data.data.data.transactions
        })
      }
    },
    components: {}
  }
</script>

<style scoped>
  #wallet{
    width: 100vw;
    min-height: 100vh;
    background: #fff;
  }
  .mint-header{
    background: #74a92e!important;
  }
  .walletFlex{
    display: flex;
    padding: 15px 0;
    position: relative;
    background: #74a92e;
    border-top: 1px solid #79b32e;
  }
  .walletBalance{
    font-size: 20px;
    color: #fff;
    flex: 1;
    display: inline-flex;
    height: 120px;
    justify-content:center;
    align-items:center;
    position: relative;
  }
  .walletBalance div{
    position: absolute;
    top: 10px;
    left: 25px;
    font-size: 14px;
  }
  .moneyBack{
    font-size: 13px;
    color: #2c4a04;
    position: absolute;
    bottom: 0;
    right: 30px;
  }
  .ad{
    padding: 12px 0;
    font-size: 16px;
    color: #74a92e;
    text-align: center;
    border-top: 2px solid #dcdcdc;
    border-bottom: 2px solid #e7e7e7;
  }
  .tradeList{
    color: #464646;
  }
  .tradeTitle{
    font-size: 16px;
    padding: 10px 15px;
    border-bottom: 2px solid #e7e7e7;
  }
  .oneTradeList{
    display: flex;
    padding: 10px 0;
    margin: 0 15px;
    justify-content: space-between;
    border-bottom: 1px solid #e7e7e7;
  }
</style>
