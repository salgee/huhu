<template>
  <div class="register-zhuye">
    <mt-header title="注册">
      <router-link to="/" slot="left">
        <router-link tag="span" to="/user/login/#"><mt-button icon="back">返回</mt-button></router-link>
      </router-link>
    </mt-header>
    <mt-cell class="register-input">
      <input placeholder="请输入手机号"   v-model="registerphone">
      <div class="register-img"></div>
      <img slot="icon" src="../assets/images/登录手机@2x.png" width="12" height="21">
    </mt-cell>
    <mt-cell class="register-input">
      <input placeholder="图形验证码"   v-model="registerimgyzm">
      <img src="http://139.224.238.161:9999/image/verification?uid=12902jkolgh3dkdv45" height="45px" width="100px">
      <img slot="icon" src="../assets/images/登录锁@2x.png" width="13" height="17">
    </mt-cell>
    <mt-cell class="register-input">
      <input placeholder="请输入手机验证码"  >
      <button class="register-button"  @click="btnregisteryzm" v-model="registerphoneyzm" >发送短信验证码</button>
      <img slot="icon" src="../assets/images/登录锁@2x.png" width="13" height="17">
    </mt-cell>
    <mt-cell class="register-input">
      <input placeholder="密码" type="password" v-model="registerpassword" >
      <div class="register-img"></div>
      <img slot="icon" src="../assets/images/登录锁@2x.png"  type="password" width="13" height="17">
    </mt-cell>
    <mt-button  class="register-btnchenggong" size="large" @click="btnregister">注册</mt-button>
    <input type="checkbox">
    <span>已阅读用户注册协议</span>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'register',
    data () {
      return {
        registerphone: '',
        registerimgyzm: '',
        registerpassword: '',
        registerphoneyzm: ''
      }
    },
    methods: {
      btnregisteryzm: function () {
        var _this = this
        axios.post('http://a.com/api/sms/send', {
          phone: _this.registerphone,
          verification: _this.registerimgyzm,
          uid: '12902jkolgh3dkdv45'
        },
          {
            headers: {'Content-Type': 'application/json'}
          })
          .then(function (response) {
            if (response.data.result === 1) {
            } else {
              _this.$toast({
                message: response.data.message,
                position: 'bottom',
                duration: 5000
              })
            }
          })
      },
      btnregister: function () {
        var _this = this
        axios.post('http://a.com/api/customer/register', {
          account: _this.registerphone,
          password: _this.registerpassword,
          verificationCode: _this.registerimgyzm
        },
          {
            headers: {'Content-Type': 'application/json'}
          })
          .then(function (response) {
            if (response.data.result === 1) {
              _this.$router.go(-1)
            } else {
              _this.$toast({
                message: response.data.message,
                position: 'bottom',
                duration: 5000
              })
            }
          })
      }
    }
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
  .register-button{
    height: 45px;
    width: 95px;
    color:#fff;
    line-height:45px;
    background-color:green;
    border: none;
    border-radius: 10px;
  }
  .register-btnchenggong{
    width:90%;
    margin:0px 5%;
    margin-top:100px;
    background-color:green;
    color:#fff;
  }

</style>
