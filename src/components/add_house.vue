<template>
  <div id="add">
    <mt-header title="添加房源" style="background: #79ac36;">
        <mt-button icon="back" slot="left" @click="$router.push({name: 'home'})"></mt-button>
    </mt-header>
    <div class="content">
      <mt-cell title="地址" to="/home/addHouse/address">
        <img src="../assets/images/返回@2x.png" alt="" width="8" height="14">
        <img slot="icon" src="../assets/images/地址@2x.png" width="20" >
      </mt-cell>
      <mt-cell title="房型" @click="console.log(1)">
        <img src="../assets/images/返回@2x.png" alt="" width="8" height="14">
        <img slot="icon" src="../assets/images/房型@2x.png" width="20" >
      </mt-cell>
      <mt-cell title="面积">
        <img src="../assets/images/返回@2x.png" alt="" width="8" height="14">
        <img slot="icon" src="../assets/images/面积@2x.png" width="20" >
      </mt-cell>
      <mt-cell title="床位数">
        <img src="../assets/images/返回@2x.png" alt="" width="8" height="14">
        <img slot="icon" src="../assets/images/床位数@2x.png" width="20" >
      </mt-cell>
      <mt-cell title="入门方式">
        <img src="../assets/images/返回@2x.png" alt="" width="8" height="14">
        <img slot="icon" src="../assets/images/入户方式@2x.png" width="20" >
      </mt-cell>
      <mt-cell title="需要门卡">
        <input type="checkbox" style="width: 16px; height: 16px">
        <img slot="icon" src="../assets/images/需要门卡@2x.png" width="20" >
      </mt-cell>
      <mt-cell title="wifi用户名">
        <input type="text" class="wifi" maxlength="30" placeholder="选填">
        <img slot="icon" src="../assets/images/wifi用户名@2x.png" width="20" >
      </mt-cell>
      <mt-cell title="wifi密码">
        <input type="text" class="wifi" maxlength="30" placeholder="选填">
        <img slot="icon" src="../assets/images/wifi密码@2x.png" width="20" >
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
  },
  beforeRouteEnter (to, from, next) {
    if (localStorage.length === 0) {
      next('/login')
    } else {
      next()
    }
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
  box-shadow: 0 3px 0 1px #ddd;
}
#add .mint-cell:last-child {
  background-image: none;
}
#add .mint-cell:first-child .mint-cell-wrapper {
  background-image: none;
}
.mint-toast {
  font-size: 12px !important;
}
</style>
