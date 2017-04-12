<template>
  <div class="login">
    <div class="login-img">
      <img src="../assets/images/login-img-top.png" aheight="100%" width="25%"/>
    </div>
    <div class="login-neirong">
      <mt-field label="手机号" placeholder="请输入手机号" class="login-input" v-model="loginphone" ></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" class="login-input" v-model="loginpassword"></mt-field>
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
        axios.post('http://a.com/api/customer/login', {
          account: _this.loginphone,
          password: _this.loginpassword,
          customerType: 'landlord'
        },
          {
            headers: {'Content-Type': 'application/json'}
          })
          .then(function (response) {
            if (response.result === 1) {
              localStorage.name = response.data.user.account
              localStorage.token = response.data.token
              alert(response.message)
              next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
              })
            } else {
              alert(response.message)
            }
          })
      }
    }
  }
</script>
<style>
  .login{
    width:100wh;
    height:100vh;;
    background-color:green;
  }

  .login-img{
    width:100%;
    height:35vh;
    position: relative;
  }
  .login-img img{
    width:20%;
    height:30%;
    position: absolute;
    top:30%;
    left:40%;
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
