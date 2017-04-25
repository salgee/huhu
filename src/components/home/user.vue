<template>
  <div class="user">
    <div class="user-neirong">
      <img src="../../assets/images/我的图片.png" alt="" class="user-neirong-beijing">
      <div>
        <!--<mt-actionsheet :actions="actions" v-model="img" ></mt-actionsheet>-->
        <div class="user-neirong-green" @click="sheetVisible = true"><img src="../../assets/images/图层-2.png"  class="user-neirong-green1"   ></div>
        <router-link tag="span" to="/user/login/#" class="wangjipws-anniu" v-if="wangjipwszhanghu===undefined">未登录</router-link>
        <router-link tag="span" to="/user/login/#" class="wangjipws-mingcheng" v-else>{{wangjipwszhanghu}}</router-link>
      </div>
  </div>
    <mt-cell title="我的评价" to="/wodepinjia"  is-link></mt-cell>
    <mt-cell title="优惠券" to="/youhuijuan" is-link></mt-cell>
    <mt-cell title="分享"  is-link></mt-cell>
    <mt-cell title="设置余额支付密码" to="/zhifumima" is-link></mt-cell>
    <mt-cell title="设置" to="/shezhi" is-link></mt-cell>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
  </div>
</template>
<script>
  export default {
    name: 'user',
    data () {
      return {
        sheetVisible: false,
        wangjipwszhanghu: localStorage.name,
        actions: [{
          name: '拍照',
          method: this.showToast
        }, {
          name: '从相册中选择',
          method: this.showMsgbox
        }]
      }
    },
    methods: {
      showToast () {
      },
      showMsgbox () {
      }
    }
  }
</script>

<style>
.user-neirong{
  width:100%;
  height:35vh;
  position: relative;
}
.user-neirong-beijing{
  width:100%;
  height:100%;
}
.user-neirong-green{
  width:20%;
  height:30%;
  position: absolute;
  top:30%;
  left:40%;
}
.user-neirong-green1{
  width:100%;
  height:100%;
}
.wangjipws-anniu{
  color: #fff;
  width: 20%;
  height: 20px;
  position: absolute;
  top: 60%;
  left: 44%;
  font-size: 2vh;
}
.wangjipws-mingcheng{
  color: #fff;
  width: 20%;
  height: 20px;
  position: absolute;
  top: 60%;
  left: 37%;
  font-size: 2vh;
}
</style>                                                                                                b

