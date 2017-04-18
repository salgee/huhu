<template>
  <div class="shezhi">
    <mt-header title="设置">
      <router-link to="/" slot="left">
        <router-link tag="span" to="/user"><mt-button icon="back">返回</mt-button></router-link>
      </router-link>
    </mt-header>
    <div class="shezhi-neirong">
      <ul>
        <li><img src="../../assets/images/login-img-top.png" aheight="100%" width="35%"/></li>
        <li><span class="shezhi-mingzi">呼呼管家</span></li>
        <li><span class="shezhi-banbenhao">1.0</span></li>
      </ul>
      <mt-cell title="关于我们"   is-link></mt-cell>
      <mt-cell title="清除缓存" is-link>
        <span>289.00KB</span>
      </mt-cell>
      <mt-cell title="修改支付密码" is-link></mt-cell>
      <mt-cell title="软件更新">
        <mt-badge size="small"  color="red">new</mt-badge>
      </mt-cell>
      <mt-cell title="推送设置" class="tuisongshezhi">
        <mt-switch v-model="value" class="tuisongshezhi-span"></mt-switch>
      </mt-cell>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'shezhi'
  }
</script>
<style>
  .shezhi{
    width:100%;
    height:100vh;
    background-color:#ededed;
  }
  .shezhi header{
    background-color:green;
  }
  .shezhi-neirong ul li{
    list-style-type: none;
  }
  .shezhi-neirong ul li img{
    margin-left: 25.5%;
  }
  .shezhi-banbenhao{
    color:green;
    margin-left: 39%;
  }
  .shezhi-mingzi{
    margin-left: 31.5%;
  }
  .tuisongshezhi .tuisongshezhi-span span{
    background-color:green!important;
    border-color:#ededed!important;
  }
</style>
