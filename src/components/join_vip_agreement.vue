<template>
  <div id="agreement">
    <mt-header title="呼呼管家VIP协议">
      <mt-button icon="back" slot="left" @click="goVip"></mt-button>
    </mt-header>
    <div class="vipAgreementContent">
      <h2 style="text-align: center">呼呼管家VIP房源服务协议</h2>
      <p>协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议协议</p>
    </div>
  </div>
</template>
<script>
  export default{
    methods: {
      goVip: function () {
        this.$router.push('/user/joinVip')
      }
    }
  }
</script>
<style scoped>
  #agreement{
    width: 100vw;
    height: 100vh;
  }
  .mint-header{
    background: #74a92e!important;
  }
  .vipAgreementContent{
    padding: 0 8px;
  }
  p{
    text-indent: 2em;
    font-size: 14px;
    line-height: 2;
  }
</style>
