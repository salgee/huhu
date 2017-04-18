<template>
  <div class="youhuijuan">
    <mt-header title="优惠券">
      <router-link to="/" slot="left">
        <router-link tag="span" to="/user"><mt-button icon="back">返回</mt-button></router-link>
      </router-link>
    </mt-header>
    <div class="youhuijuan-juan">
      <span class="youhuijuan-jiage">￥20</span>
      <ul class="youhuijuan-xiaul">
        <li><span>优惠券</span><span class="youhuijuan-youhui">满200减200</span></li>
        <li class="youhuijuan-riqi"><span>2016-1-1</span></li>
      </ul>
    </div>
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
    background-color: #ededed;
  }
  .youhuijuan header{
    background-color:green;
  }
  .youhuijuan-juan{
    background-color: #fff;
    margin-top:10px;
  }
  .youhuijuan-juan  ul{
    margin:0 0;
    padding:0 0;
  }
  .youhuijuan-juan  ul li{
    list-style-type: none;
    line-height:20px;
  }
  .youhuijuan-jiage{
    color:red;
    font-size:15px;
  }
  .youhuijuan-riqi{
    font-size:10px;
    color:#ededed;
  }
  .youhuijuan-youhui{
    font-size:10px;
    color:#ededed;
  }
</style>
