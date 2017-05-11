<template>
  <div id="order">
    <mt-header title="订单">
      <!--<img src="../../assets/images/信封@2x.png" slot="right" @click="goPushList" style="width: 20px;font-size: 0;">-->
    </mt-header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="processing">进行中</mt-tab-item>
      <mt-tab-item id="cancel">已取消</mt-tab-item>
      <mt-tab-item id="waitHandle">待处理</mt-tab-item>
      <mt-tab-item id="finish">已完成</mt-tab-item>
    </mt-navbar>
    <!--根据选项卡id,显示页面-->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="processing">
        <router-view name="processing"></router-view>
      </mt-tab-container-item>
      <mt-tab-container-item id="cancel">
        <router-view name="cancel"></router-view>
      </mt-tab-container-item>
      <mt-tab-container-item id="waitHandle">
        <router-view name="waitHandle"></router-view>
      </mt-tab-container-item>
      <mt-tab-container-item id="finish">
        <router-view name="finish"></router-view>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import {Indicator} from 'mint-ui'
  export default {
    name: 'order',
    data () {
      return {
        selected: sessionStorage.huhu_selected || 'processing'
      }
    },
    watch: {
      selected (val) {
        let vm = this
        switch (val) {
          case 'processing':
            Indicator.open()
            vm.$router.push('/order/processing')
            break
          case 'cancel':
            Indicator.open()
            vm.$router.push('/order/cancel')
            break
          case 'waitHandle':
            Indicator.open()
            vm.$router.push('/order/waitHandle')
            break
          case 'finish':
            Indicator.open()
            vm.$router.push('/order/finish')
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
      },
      $route (val) {
        this.selected = val.name
      }
    },
    components: {
      Indicator
    },
    beforeRouteEnter (to, from, next) {
      if (to.name === 'order') {
        sessionStorage.huhu_selected = 'processing'
      } else {
        sessionStorage.huhu_selected = to.name
      }
      Indicator.open()
      next()
    },
    beforeRouteLeave (to, from, next) {
      if (to.path.indexOf('orderInfo') === -1) {
        sessionStorage.removeItem('huhu_selected')
        sessionStorage.removeItem('huhu_homeselected')
      }
      Indicator.close()
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
  #order button {
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
