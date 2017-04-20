<template>
  <div id="pushOrderBefore">
    <mt-header title="填写信息">
      <mt-button icon="back" slot="left" @click="goHome"></mt-button>
    </mt-header>
    <div class="pushInfo">
      <mt-cell title="接待方式">
        <img slot="icon" src="../assets/images/客户接待@2x.png" width="20" @click="openPicker">
        <img src="../assets/images/返回@2x.png" width="8" height="14" v-if="reception==''" @click="openPicker">
        <span v-model="reception" v-else @click="openPicker">{{reception}}</span>
      </mt-cell>
      <mt-cell title="接引时间">
        <img slot="icon" src="../assets/images/接引时间@2x.png" width="20" @click="openReceiveTime">
        <img src="../assets/images/返回@2x.png" width="8" height="14"  v-if="receive==''" @click="openReceiveTime">
        <span v-model="receive" v-else @click="openReceiveTime">{{receive}}</span>
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
        <div><router-link tag="span" class="joinVip" to="/user/vip/joinVip">申请VIP</router-link></div>
      </div>
    </div>

    <div class="pushOrder">
      <div>合计:￥119</div>
      <button class="btn">我要下单</button>
    </div>
    <!--接待方式-->
    <mt-popup v-model="popupReception" position="bottom" >
      <mt-picker :slots="receptionSlots" :showToolbar="true" @change="getValue" :visibleItemCount="3">
        <div class="pickerTitle">
          <div style="text-align: left;"><span @click="receptionCancel">取消</span></div>
          <div style="text-align: right;color:#74a92e"><span @click="getReception">确定</span></div>
        </div>
      </mt-picker>
    </mt-popup>
    <!--接待时间-->
    <mt-popup v-model="popupReceive" position="bottom">
      <mt-picker :slots="ReceiveSlots" :showToolbar="true" @change="getReceiveTimeValue">
        <div class="pickerTitle">
          <div style="text-align: left;"><span @click="receiveCancel">取消</span></div>
          <div style="text-align: right;color:#74a92e"><span @click="getReceive">确定</span></div>
        </div>
      </mt-picker>
    </mt-popup>
  </div>
</template>
<script>
  export default{
    mounted () {
    },
    methods: {
      goHome: function () {
        this.$router.push('/')
      },
//  -------------------------------接待方式popup和picker
      openPicker: function () {
        this.popupReception = true
      },
      receptionCancel: function () {
        this.popupReception = false
      },
      getReception: function () {
        this.popupReception = false
        this.reception = this.saveReception
      },
      getValue: function (picker) {
        this.saveReception = picker.getValues()[0]
      },
//  -------------------------------接待时间popup和picker
      openReceiveTime: function () {
        this.popupReceive = true
      },
      receiveCancel: function () {
        this.popupReceive = false
      },
      getReceive: function () {
        this.popupReceive = false
        this.receive = this.saveReceive
      },
      getReceiveTimeValue: function (picker, values) {
        this.saveReceive = picker.getValues()[0] + picker.getValues()[1]
        if (this.select === values[0]) {
          return
        } else {
          if (values[0] !== JSON.parse(sessionStorage.days)[0]) {
            picker.setSlotValue(1, '08:00-08:30')
          }
        }
        values[0] = this.select
      }
    },
    data () {
      return {
        select: '',
//  -------------------------------接待方式popup和picker
        popupReception: false,
        receptionSlots: [
          {
            values: ['自主入住', '接引客户'],
            className: 'receptionSlot',
            textAlign: 'center'
          }
        ],
        reception: '',
        saveReception: '',
//  ------------------------------接待时间popup和picker
        popupReceive: false,
        ReceiveSlots: [
          {
            values: JSON.parse(sessionStorage.days),
            className: 'receiveSlots1',
            textAlign: 'left'
          },
          {
            values: ['08:00-08:30', '08:30-09:00', '09:00-09:30', '09:30-10:00', '10:00-10:30', '10:30-11:00', '11:00-11:30', '11:30-12:00', '12:00-12:30', '12:30-13:00', '13:00-13:30', '13:30-14:00', '14:00-14:30', '14:30-15:00', '15:00-15:30', '15:30-16:00', '16:00-16:30', '16:30-17:00', '17:00-17:30', '17:30-18:00', '18:00-18:30', '18:30-19:00', '19:00-19:30', '19:30-20:00'],
            className: 'receiveSlots2',
            textAlign: 'right'
          }
        ],
        receive: '',
        saveReceive: ''
      }
    }
  }
</script>
<style scoped>
  a {
    font-size: 0;
  }
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
  .pushInfo span{
    font-size: 13px;
    color: #000;
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
  .receptionSlot{
    width: 100%;
  }
</style>
