<template>
  <div class="shezhi">
    <mt-header title="设置">
      <router-link to="/" slot="left">
        <router-link tag="span" to="/user"><mt-button icon="back">返回</mt-button></router-link>
      </router-link>
    </mt-header>
  </div>
</template>
<script>
  export default {
    name: 'shezhi'
  }
</script>
<style>
  .shezhi{
    width:100wh;
    height:100vh;
  }
  .shezhi header{
    background-color:green;
  }
</style>
