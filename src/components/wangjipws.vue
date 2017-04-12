<template>
  <div>
    <div>
      <mt-header fixed title="忘记密码"  id="touse">
        <router-link to="/login" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="kuang">
      <div>
        <img src="" alt="">
        <input type="text" placeholder="请输入手机号">
      </div>
      <div id="bxian">
        <img src="" alt="">
        <input placeholder="请输入图形验证码" type="password">
      </div>
      <div id="bxian">
        <img src="" alt="">
        <input type="text" placeholder="请输入短信验证码">
      </div>
      <mt-button id="sbsbsb">发起验证码</mt-button>
      <span class="yzmm"></span>
    </div>
    <div class="ankuang">
      <mt-button id="btn">下一步</mt-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'wangjipws'
  }
</script>
<style >
  #touse{
    background:green;
  }
  .kuang{
    position: relative;
    top:40px;
    width:95%;
    margin: auto;
  }
  .kuang div{
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #b1b1b1;
  }
  #bxian{
    width:50%;
  }
  .kuang div input{
    height: 25px;
    width:100%;
    background-color: rgba(242, 242, 242, 1);
    border: 0px solid;
    margin-top: 13px;
    font-size: 15px;
  }
  .ankuang{
    width:100%;
    padding-top: 190px;
    text-align: center;
  }
  #sbsbsb{
    float: right;
    margin-top: -45px;
    margin-right: 15px;
    background: green;
    color: #fff;
  }
  .yzmm{
    display: inline-block;
    width: 114px;
    background: #00A000;
    height: 40px;
    float: right;
    margin-top: -95px;
    margin-right: 15px;
  }
  #btn{
    width: 85%;
    background:green;
    color: #fff;
  }
</style>
