<template>
    <div id="houseItem">
      <div class="houseItem">
        <div class="houseAddress">
          <span>哈哈哈市</span><span>就是那座大楼12138号</span>
        </div>
        <div class="houseInfo">
          <span>1居室&nbsp;/</span>
          <span>1张床&nbsp;/</span>
          <span>密码</span>
        </div>
        <div class="houseBtn">
          <button class="oneClick" v-if="true">一键下单</button>
          <button class="oneClick" v-else>一键下单</button>
          <button class="joinVIP">加入VIP</button>
        </div>
      </div>
    </div>
</template>
<!--<script>-->
    <!--export default{-->
        <!--data(){-->
            <!--return {-->

            <!--}-->
        <!--},-->
        <!--methods: {}-->
    <!--}-->
<!--</script>-->
<style scoped>
  .houseItem{
    margin:10px;
    border: 1px solid #edf3e6;
    padding: 20px 10px;
    border-radius: 5px;
    background: #fff;
    position: relative;
  }
  .houseItem{
    margin:10px;
    border: 1px solid #edf3e6;
    padding: 20px 10px;
    border-radius: 5px;
    background: #fff;
    position: relative;
  }
  .houseItem::after{
    border: 1px solid #edf3e6;
    width: 100%;
    border-radius: 5px;
    background: #c8dcaf;
    content: '';
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    transform:rotate(-2deg) translateX(-1px) scale(1.01,1);
  }
  .houseAddress{
    font-size: 15px;
    margin-bottom: 15px;
  }
  .houseInfo{
    margin-bottom: 25px;
  }
  .houseInfo span{
    font-size: 12px;
    margin-right: 3px;
  }
  .houseBtn button{
    margin-right: 35px;
    font-size:13px;
    padding: 0;
  }
  .houseBtn .oneClick{
    border: none;
    border-radius: 5px;
    background:-webkit-linear-gradient(left,#74a92e,#aecd43);
    color: #fff;
    outline: none;
    width: 100px;
    height: 27px;
  }
  .houseBtn .joinVIP{
    border: 1px solid #79ac36;
    border-radius: 5px;
    background: #fff;
    color: #79ac36;
    outline: none;
    width: 100px;
    height: 27px;
  }
</style>
