<template>
  <div>
    <div class="house-info">
      <h3><img class="vip" v-if="infos.houseInfo.vip === 1" src="../../../assets/images/VIP@2x.png" alt="">
        {{infos.houseInfo.address+infos.houseInfo.buildingNo}}</h3>
      <span>订单编号：{{infos.houseInfo.orderId}}</span>
      <div v-if="infos.orderInfo.orderStatus !== 'waitPay'" class="time">{{orderTime(infos.orderInfo.createTime)}}</div>
      <slot name="delete"></slot>
    </div>
    <div class="info">
      <p>
        <span>接待方式：{{receptionType[infos.orderInfo.receptionType]}}</br></span>
        <span v-if="infos.orderInfo.receptionType === 'byGuide'">接引时间：{{infos.orderInfo.receptionTimeFromStr}}</br></span>
        <span>清洁时间：{{infos.orderInfo.serviceTimeFromStr}}</span>
      </p>
      <div class="fee">
        <span>&yen; {{infos.orderTotalAmount.toFixed(2)}}</span></br>
        <span v-if="infos.orderInfo.award!==0">{{'打赏 &yen; '+infos.orderInfo.award+'.00'}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'order-main',
  data () {
    return {
      receptionType: {
        byYourself: '自主入住',
        byGuide: '接引用户'
      }
    }
  },
  props: ['infos'],
  methods: {
    // 计算订单有效时间
    orderTime (time) {
      let timeDis = ((new Date()).getTime() / 1000 - time) / 60
      if (timeDis > 15) return
      return '剩余' + Math.ceil(15 - timeDis) + '分钟'
    }
  }
}
</script>

<style scoped>
  .house-info h3{
    font-size: 12px;
    font-weight: normal;
    margin: 0;
    margin-bottom: 10px;
  }
   .house-info {
    position: relative;
  }
   .house-info span{
    color: #adadad;
  }
   .time, .delete{
    position: absolute;
    top: 0;
    right: 0;
    padding-top: 25px;
    background: url('../../../assets/images/时间@2x.png') no-repeat top right;
    background-size: 20px;
    color: #74a92e;
    transform: scale(.8);
  }
  .delete {
    background: url('../../../assets/images/垃圾桶.png') no-repeat center;
    width: 15px;
    margin-right: 10px;
  }
   .info {
    position: relative;
    margin: 16px 0;
  }
   .info p {
    margin: 0;
    line-height: 25px;
  }
   .info .fee{
    position: absolute;
    top: 0;
    right: 0;
    line-height: 22px;
    text-align: right;
  }
   .info .fee span{
    font-size: 14px;
    color: red;
  }
  .vip {
    float: left;
    margin-right: 4px;
    width: 15px;
    height: 14px;
    vertical-align: top;
  }
</style>
