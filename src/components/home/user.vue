<template>
  <div class="user">
    <div class="user-neirong">
      <img src="../../assets/images/我的图片.png" alt="" class="user-neirong-beijing">
      <router-link tag="span" to="/login" class="wangjipws"><img src="../../assets/images/图层-2.png" class="user-neirong-geren"></router-link>
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
    mounted () {

    },
    data () {
      return {}
    },
    methods: {},
    components: {}
  }
</script>

<style>
.user-neirong{
  width:100%;
  height:200px;
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

</style>
