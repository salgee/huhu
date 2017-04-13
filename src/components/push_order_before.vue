<template>
  <div id="pushOrderBefore">
    <mt-header title="填写信息">
      <mt-button icon="back" slot="left" @click="goHome"></mt-button>
    </mt-header>
    <div class="pushInfo">
      <mt-cell title="接待方式">
        <img slot="icon" src="../assets/images/客户接待@2x.png" width="20">
        <img src="../assets/images/返回@2x.png" width="8" height="14" @click="reception">
      </mt-cell>
      <mt-cell title="接引时间">
        <img slot="icon" src="../assets/images/接引时间@2x.png" width="20" >
        <img src="../assets/images/返回@2x.png" width="8" height="14">
      </mt-cell>
      <mt-cell title="清洁时间">
        <img slot="icon" src="../assets/images/清洁时间@2x.png" width="20" >
        <img src="../assets/images/返回@2x.png" width="8" height="14">
      </mt-cell>
      <mt-cell title="入住人姓名">
        <img slot="icon" src="../assets/images/入住人姓名@2x.png" width="20" >
        <input type="text" maxlength="15"  class="guest">
      </mt-cell>
      <mt-cell title="入住人联系方式">
        <img slot="icon" src="../assets/images/入住人联系方式@2x.png" width="20" >
        <input type="text" maxlength="11"  class="guest">
      </mt-cell>
    </div>
    <div class="serviceCharge">
      <div class="serviceLeft">
        <img src="../assets/images/服务费@2x.png">
        <span>服务费</span>
      </div>
      <div class="serviceRight">
        <span class="vipPrice">(VIP价￥118)</span>
        <span>￥119</span>
        <div><router-link tag="span" class="joinVip" to="/user/joinVip">申请VIP</router-link></div>
      </div>
    </div>

    <div class="pushOrder">
      <div>合计:￥119</div>
      <button class="btn">我要下单</button>
    </div>
    <mt-popup v-model="popupReception" position="bottom">
      <mt-picker :slots="slots" :showToolbar="true">
        <div class="pickerTitle">
          <div style="text-align: left;">取消</div>
          <div style="text-align: right;color:#74a92e">确定</div>
        </div>
      </mt-picker>
    </mt-popup>
  </div>
</template>
<script>
  export default{
    methods: {
      goHome: function () {
        this.$router.push('/')
      },
      reception: function () {
        this.popupReception = true
      }
    },
    data () {
      return {
        popupReception: false,
        slots: [
          {
            values: ['自主入住', '接引客户'],
            className: 'slot1',
            textAlign: 'center'
          }
        ]
      }
    }
  }
</script>
<style scoped>
  .mint-header{
    background: #74a92e!important;
  }
  #pushOrderBefore{
    width: 100vw;
    height: 100vh;
    background: #eee;
  }
  .pushInfo{
    margin-top: 10px;
    margin-bottom: 10px;
    background: #fff;
  }
  .pushInfo .guest{
    border: none;
    outline: none;
    text-align: right;
    width: 120px;
    font-size: 15px;
    color: #000;
  }
  .serviceCharge{
    font-size: 0;
    width: 100%;
    padding: 20px 10px;
    box-sizing: border-box;
    background: #fff;
  }
  .serviceCharge img{
    width: 20px;
    height: 24px;
    vertical-align: middle;
  }
  .serviceCharge .serviceLeft,.serviceRight{
    width: 50%;
    vertical-align: top;
    display: inline-block;
  }
  .serviceLeft span{
    color: #8c8c8c;
    font-size: 15px;
    padding-left: 14px;
    vertical-align: middle;
  }
  .serviceRight{
    font-size: 15px;
    text-align: right;
  }
  .serviceRight span{
    vertical-align: middle;
  }
  .serviceRight .vipPrice{
    font-size: 12px;
    color: #fd805b;
  }
  .serviceRight .joinVip{
    border: 1px solid #fd805b;
    padding: 1px 2px;
    border-radius: 2px;
    font-size: 15px;
    color: #fd805b;
    display: inline-block;
    margin-top: 2px;
  }
  .pushOrder{
    position: fixed;
    bottom: 0;
    border-top: 1px solid #d9d9d9;
    font-size: 0;
    width: 100%;
    height: 50px;
  }
  .pushOrder div{
    width: 60%;
    height: 100%;
    line-height: 50px;
    padding-left: 10px;
    box-sizing: border-box;
    font-size: 15px;
    color: #fd805b;
    display: inline-block;
  }
  .pushOrder .btn{
    width: 40%;
    height: 100%;
    background: #74a92e;
    color: #fff;
    font-size: 15px;
    border: none;
    outline: none;
    text-align: center;
  }
  .pickerTitle{
    width: 100vw;
    font-size: 0;
    padding: 10px 0;
    border-bottom: 1px solid #d9d9d9;
  }
  .pickerTitle div{
    display: inline-block;
    width: 50%;
    font-size: 15px;
    padding: 0 10px;
    box-sizing: border-box;
  }
</style>
<style>
  .pushInfo .mint-cell-title span{
    color: #8c8c8c;
    font-size: 15px;
    padding-left: 10px;
  }
</style>
