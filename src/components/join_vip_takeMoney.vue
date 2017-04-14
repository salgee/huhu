<template>
  <div id="takeMoney">
    <mt-header title="押金支付">
      <mt-button icon="back" slot="left" @click="goVip"></mt-button>
    </mt-header>
  </div>
</template>
<script>
  export default{
    methods: {
      goVip: function () {
        window.history.go(-1)
      }
    }
  }
</script>
<style scoped>
  #takeMoney{
    width: 100vw;
    height: 100vh;
  }
  .mint-header{
    background: #74a92e!important;
  }
</style>
