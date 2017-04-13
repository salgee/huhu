<template>
  <div class="fenxiang">
    <mt-header title="分享">
      <router-link to="/" slot="left">
        <router-link tag="span" to="/user"><mt-button icon="back">返回</mt-button></router-link>
      </router-link>
    </mt-header>
  </div>
</template>
<script>
  export default {
    name: 'fenxiang'
  }
</script>
<style>
  .fenxiang{
    width:100wh;
    height:100vh;
  }
  .fenxiang header{
    background-color:green;
  }
</style>
