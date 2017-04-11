<template>
  <div id="add">
    <mt-header title="添加房源" style="background: #79ac36;">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="content">
      <mt-cell title="标题文字">
        <img src="../assets/images/返回@2x.png" alt="" width="8" height="14">
        <img slot="icon" src="../assets/images/布告栏@2x.png" width="20" >
      </mt-cell>
      <mt-cell title="标题文字">
        <img src="../assets/images/返回@2x.png" alt="" width="8" height="14">
        <img slot="icon" src="../assets/images/布告栏@2x.png" width="20" >
      </mt-cell>
      <mt-cell title="标题文字">
        <img src="../assets/images/返回@2x.png" alt="" width="8" height="14">
        <img slot="icon" src="../assets/images/布告栏@2x.png" width="20" >
      </mt-cell>
      <mt-cell title="标题文字">
        <img src="../assets/images/返回@2x.png" alt="" width="8" height="14">
        <img slot="icon" src="../assets/images/布告栏@2x.png" width="20" >
      </mt-cell>
      <mt-cell title="标题文字">
        <img src="../assets/images/返回@2x.png" alt="" width="8" height="14">
        <img slot="icon" src="../assets/images/布告栏@2x.png" width="20" >
      </mt-cell>
      <mt-cell title="标题文字">
        <input type="checkbox" style="width: 16px; height: 16px">
        <img slot="icon" src="../assets/images/布告栏@2x.png" width="20" >
      </mt-cell>
      <mt-cell title="标题文字">
        <input type="text" class="wifi" maxlength="30" placeholder="选填">
        <img slot="icon" src="../assets/images/布告栏@2x.png" width="20" >
      </mt-cell>
      <mt-cell title="标题文字">
        <input type="text" class="wifi" maxlength="30" placeholder="选填">
        <img slot="icon" src="../assets/images/布告栏@2x.png" width="20" >
      </mt-cell>
    </div>
    <div class="submit">
      <mt-button type="danger" size="large">提交</mt-button>
    </div>
  </div>
</template>
<script>
import {Cell, Header, Button} from 'mint-ui'
export default {
  name: 'addHouse',
  mounted () {

  },
  data () {
    return {}
  },
  methods: {},
  components: {
    Cell,
    mtHeader: Header,
    mtButton: Button
  }
}
</script>

<style>
a {
  font-size: 0;
}
#add{
  width: 100vw;
  height: 100vh;
}
#add .mint-cell-wrapper {
  width: 95%;
  margin-left: 5%;
}
#add .mint-cell+.mint-cell .mint-cell-wrapper{
  border-top: 1px solid #000;
}
#add .mint-cell-title span{
  font-size: 15px;
  margin-left: 20px;
}
#add .content{
  color: #000;
  background-color: #fff;
  margin-top: 10px;
  font-size: 0;
}
#add .wifi{
  border: none;
  outline: none;
  text-align: right;
}
#add .submit{
  position: absolute;
  bottom: 60px;
  right: 0;
  left: 0;
  margin: auto;
  width: 80%;
  text-align: center;
}
#add .submit button{
  background-color: #79ac36;
  box-shadow: 0 5px 0 1px #ddd;
}
</style>
