<template>
  <div id="bottomBar">
      <section class="source " :class="active==='source'?'active':ac">房源</section>
      <section class="order">订单</section>
      <router-link to="/addHouse"><section class="add"><img src="../../assets/images/+@2x.png" alt=""></section></router-link>
      <section class="money">钱包</section>
      <section class="user">我的</section>
  </div>
</template>

<script>
export default {
  name: 'nav',
  props: ['active'],
  mounted () {

  },
  data () {
    return {

    }
  },
  methods: {},
  components: {}
}
</script>

<style scoped>
    #bottomBar {
        position: fixed;
        bottom: 0px;
        width: 100%;
        height: 40px;
        background-color: #fff;
        font-size: 0;
    }
    #bottomBar section{
        display: inline-block;
        box-sizing: border-box;
        padding-top: 24px;
        width: 20%;
        height: 40px;
        font-size: 12px;
        text-align: center;
        vertical-align: top;
        background: url("../../assets/images/+@2x.png") no-repeat 23px 5px ;
        background-size: 30%;
    }
    #bottomBar .add{
        background: none;
        padding: 10px;
    }
    #bottomBar .add img{
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background-color: #adadad;

    }
    #bottomBar .active{
        /*background-color: #79ac36;*/
        color: #79ac36;
    }
</style>
