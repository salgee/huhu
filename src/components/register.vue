<template>
  <div class="register-zhuye">
    <mt-header title="注册">
      <router-link to="/" slot="left">
        <router-link tag="span" to="/login"><mt-button icon="back">返回</mt-button></router-link>
      </router-link>
    </mt-header>
  </div>
</template>
<script>

  export default {
    name: 'register'
  }
</script>
<style scoped>
  .register-zhuye header{
    background-color:green;
  }
</style>
