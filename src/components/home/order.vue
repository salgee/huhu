<template>
  <div id="order">
    <mt-header title="订单">
      <img src="../../assets/images/信封@2x.png" slot="right" @click="goPushList" style="width: 20px;font-size: 0;">
    </mt-header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">进行中</mt-tab-item>
      <mt-tab-item id="2">已取消</mt-tab-item>
      <mt-tab-item id="3">待处理</mt-tab-item>
      <mt-tab-item id="4">已完成</mt-tab-item>
    </mt-navbar>
    <!--根据选项卡id,显示页面-->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div>1</div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div>2</div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div>3</div>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <div>4</div>
      </mt-tab-container-item>
    </mt-tab-container>
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
    methods: {
      goPushList: function () {
        this.$router.push('/order/pushList')
      }
    },
    components: {}
  }
</script>

<style>
  .mint-header{
    background: #74a92e!important;
  }
  #order{
    width: 100vw;
    height: 100vh;
  }
</style>
