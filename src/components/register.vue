<template>
  <div class="register-zhuye">
    <mt-header title="注册">
      <router-link to="/" slot="left">
        <router-link tag="span" to="/user/login/#"><mt-button icon="back">返回</mt-button></router-link>
      </router-link>
    </mt-header>
    <mt-cell class="register-input">
      <input placeholder="请输入手机号"  >
      <div class="register-img"></div>
      <img slot="icon" src="../assets/images/登录手机@2x.png" width="12" height="21">
    </mt-cell>
    <mt-cell class="register-input">
      <input placeholder="图形验证码"  >
      <img src="../assets/images/login.png" height="45px" width="100px">
      <img slot="icon" src="../assets/images/登录锁@2x.png" width="13" height="17">
    </mt-cell>
    <mt-cell class="register-input">
      <input placeholder="请输入手机验证码"  >
      <img src="../assets/images/login.png" height="45px" width="100px">
      <img slot="icon" src="../assets/images/登录锁@2x.png" width="13" height="17">
    </mt-cell>
    <mt-cell class="register-input">
      <input placeholder="密码" type="password" >
      <div class="register-img"></div>
      <img slot="icon" src="../assets/images/登录锁@2x.png"  type="password" width="13" height="17">
    </mt-cell>
  </div>
</template>
<script>
  export default {
    name: 'register'
  }
</script>
<style scoped>
  .register-zhuye{
    width:100vw;
    height:100vh;
    background-color:#ededed;
  }
  .register-zhuye header{
    background-color:green;
  }
  .register-zhuye .register-input{
    background-color: transparent;
    width:90%;
    margin:0px 5%;
  }
  .register-zhuye .register-input input{
    background-color: transparent;
    height: 8vh;
    border: none;
    outline: 0;
    color:#BBBBBB;
  }
.register-img{
  height: 45px;
  width: 100px;
}
</style>
