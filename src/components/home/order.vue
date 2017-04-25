<template>
  <div id="order">
    <mt-header title="订单">
      <img src="../../assets/images/信封@2x.png" slot="right" @click="goPushList" style="width: 20px;font-size: 0;">
    </mt-header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="processing">进行中</mt-tab-item>
      <mt-tab-item id="2">已取消</mt-tab-item>
      <mt-tab-item id="3">待处理</mt-tab-item>
      <mt-tab-item id="4">已完成</mt-tab-item>
    </mt-navbar>
    <!--根据选项卡id,显示页面-->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="processing">
        <router-view></router-view>
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
    name: 'order',
    mounted () {

    },
    data () {
      return {
        selected: 'processing'
      }
    },
    methods: {
      goPushList: function () {
        this.$router.push('/order/pushList')
      }
    },
    watch: {
      selected (val) {
        console.log(val)
      }
    },
    components: {}
  }
</script>

<style >
  .mint-header{
    background: #74a92e!important;
  }
  #order{
    width: 100vw;
    height: 100vh;
  }
  #order .order-handle{
    text-align: right;
  }
  #order .order-handle button {
    font-size: 12px;
    margin-left: 10px;
    padding: 0 24px;
    height: 26px;
    background-color: #74a92e;
    color: #fff;
  }
</style>
