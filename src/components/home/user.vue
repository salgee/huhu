<template>
  <div class="user">
    <div class="user-neirong">
      <img src="../../assets/images/我的图片.png" alt="" class="user-neirong-beijing">
      <img src="../../assets/images/图层-2.png"  class="user-neirong-geren" >
      <router-link tag="span" to="/login" class="wangjipws-anniu">未登录</router-link>
  </div>
    <mt-cell title="我的评价" is-link></mt-cell>
    <mt-cell title="优惠券" is-link></mt-cell>
    <mt-cell title="分享" is-link></mt-cell>
    <mt-cell title="设置余额支付密码" is-link></mt-cell>
    <mt-cell title="设置" is-link></mt-cell>
  </div>
</template>

<script>
  export default {
    name: 'addHouse',
    data () {
      return {
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
.user-neirong-geren{
  width:20%;
  height:30%;
  position: absolute;
  top:30%;
  left:40%;
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

</style>
