<template>
  <div class="zhifumima">
    <mt-header title="设置余额支付密码">
      <router-link to="/" slot="left">
        <router-link tag="span" to="/user"><mt-button icon="back">返回</mt-button></router-link>
      </router-link>
    </mt-header>
  </div>
</template>
<script>
  export default {
    name: 'zhifumima'
  }
</script>
<style>
  .zhifumima{
    width:100wh;
    height:100vh;
  }
  .zhifumima header{
    background-color:green;
  }
</style>
