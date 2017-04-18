<template>
 <div class="wodepinjia">
   <mt-header title="我的评价">
     <router-link to="/" slot="left">
       <router-link tag="span" to="/user"><mt-button icon="back">返回</mt-button></router-link>
     </router-link>
   </mt-header>
   <div class="zuijinpinglun">
     <ul class="wodepinjia-shangul">
       <li><div class="neirong-touxiang"></div><span class="mingzi">杨轶雄</span></li>
       <li><img src="../../assets/images/星级@2x.png" height="10px" alt=""></li>
       <li class="wodepinjia-dingdanhao"><span>订单号：</span><span>1456789324536</span></li>
     </ul>
     <ul class="wodepinjia-xiaul">
       <li><span>我的评论：</span><span class="mingzi">很好</span></li>
       <li class="wodepinjia-riqi"><span>2016-1-1</span></li>
     </ul>
   </div>
 </div>
</template>
<script>
  export default {
    name: 'wodepinjia'
  }
</script>
<style>
  .wodepinjia{
    width:100wh;
    height:100vh;
    background-color:#ededed;
  }
  .wodepinjia header{
    background-color:green;
  }
  .zuijinpinglun ul li{
    list-style-type: none;
    line-height:20px;
  }
  .zuijinpinglun span{
    color:#ededed;
  }
  .zuijinpinglun ul{
    margin:0 0;
    padding:0 0;
  }
  .zuijinpinglun{
    background-color:#fff;
    width: 100%;
    margin-top: 10px;
  }
  .neirong-touxiang{
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ededed;
    float:left;
  }
  .zuijinpinglun .mingzi{
    font-size: 15px;
    color:#333;
  }
  .wodepinjia-dingdanhao span{
    font-size:10px;
  }
  .wodepinjia-riqi span{
    font-size:10px;
  }
  .wodepinjia-xiaul li{
    line-height: 20px!important;
  }
</style>
