<template>
  <div class="youhuijuan">
    <mt-header title="优惠券">
      <router-link to="/" slot="left">
        <router-link tag="span" to="/user"><mt-button icon="back">返回</mt-button></router-link>
      </router-link>
    </mt-header>
  </div>
</template>
<script>
  export default {
    name: 'youhuijuan'
  }
</script>
<style>
  .youhuijuan{
    width:100wh;
    height:100vh;
  }
  .youhuijuan header{
    background-color:green;
  }
</style>
