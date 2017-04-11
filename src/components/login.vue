<template>
  <div class="login">
    <div class="login-img">
      <img src="../assets/images/login-img-top.png" aheight="100%" width="25%"/>
    </div>
    <div class="login-neirong">
      <mt-field label="手机号" placeholder="请输入手机号" class="login-input">{{loginphone}}</mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" class="login-input">{{loginpassword}}</mt-field>
    </div>
    <router-link tag="span" to="/wangjipws" class="wangjipws">忘记密码?</router-link>
    <router-link tag="span" to="/register" class="register">注册</router-link>
    <div class="login-btn">
      <mt-button plain size="large" @click="btnLogin" class="login-button">登录</mt-button>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  export default {
    name: 'login',
    data () {
      return {
        loginphone: '',
        loginpassword: ''
      }
    },
    methods: {
      btnLogin: function () {
        var _this = this
        axios.post('http://139.224.238.161:9999/api/customer/login', {
          params: {
            account: _this.loginphone,
            password: _this.loginpassword,
            customerType: 'landlord'
          }
        })
          .then(function (response) {

          })
      }
    }
  }
</script>
<style >
  body{
    width:100%;
    height:100%;;
    background-color:green;
  }
  .login-img img{
    margin: 60px 37.25%;
  }
  .login-btn .login-button{
    width:80%;
    margin:20px 10%;
    border: 2px solid #fff!important;
    color: #fff!important;
  }
  .login-neirong .login-input{
    width:80%;
    margin:0px 10%;
    background-color: transparent;
    color:#fff;
  }
  .login-neirong .login-input input{
    background-color: transparent;
  }
  .login-neirong .login-input input[placeholder], [placeholder], *[placeholder] {
    color:#fff !important;
  }
  .wangjipws{
    color:#fff;
    margin-left:10%;
  }
  .register{
    color:#fff;
    margin-left:45%;
  }
</style>
