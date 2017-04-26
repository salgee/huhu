<template>
  <div id="order">
    <mt-header title="订单">
      <img src="../../assets/images/信封@2x.png" slot="right" @click="goPushList" style="width: 20px;font-size: 0;">
    </mt-header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="processing">进行中</mt-tab-item>
      <mt-tab-item id="cancel">已取消</mt-tab-item>
      <mt-tab-item id="3">待处理</mt-tab-item>
      <mt-tab-item id="4">已完成</mt-tab-item>
    </mt-navbar>
    <!--根据选项卡id,显示页面-->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="processing">
        <router-view v-if="selected === 'processing'"></router-view>
      </mt-tab-container-item>
      <mt-tab-container-item id="cancel">
        <router-view v-if="selected === 'cancel'"></router-view>
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
        selected: sessionStorage.huhu_selected || 'processing'
      }
    },
    methods: {
      goPushList: function () {
        this.$router.push('/order/pushList')
      }
    },
    watch: {
      selected (val) {
        let vm = this
        switch (val) {
          case 'processing':
            sessionStorage.huhu_selected = 'processing'
            vm.$router.push('/order/processing')
            break
          case 'cancel':
            sessionStorage.huhu_selected = 'cancel'
            vm.$router.push('/order/cancel')
            break
          case 'order':
            vm.$router.push('/order')
            break
          case 'user':
            vm.$router.push('/user')
            break
          case 'add':
            vm.$router.push('/home/addHouse')
            break
        }
      }
    },
    beforeRouteLeave (to, from, next) {
      if (to.path.indexOf('orderInfo') === -1) {
        sessionStorage.removeItem('huhu_selected')
      }
      next()
    }
  }
</script>

<style>
  .mint-header{
    background: #74a92e!important;
  }
  #order{
    width: 100vw;
    min-height: 100vh;
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
  #order .mint-navbar {
    top: 40px;
    background-color: #74a92e;
    border-top: 1px solid rgba(116,195,144,.3);
  }
  #order .mint-tab-item {
    padding: 10px 0;
  }
  #order .mint-tab-item-label {
    color: #fff;
  }
  #order .is-selected {
    position: relative;
    border-bottom: 2px solid #74a92e;
    background-color: #74a92e;
    color: #fff;
    margin-bottom: 0px;
  }
  #order .is-selected::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 25%;
    width: 50px;
    height: 2px;
    background-color: #74a92e;
  }
</style>
