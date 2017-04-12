<template>
  <div id="add">
    <mt-header title="地址详情" style="background: #79ac36;">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <div class="content">
      <a @click="popUp">
      <mt-cell title="省、市、区">
        <img src="../../assets/images/返回@2x.png" alt="" width="8" height="14">
        <img slot="icon" src="../../assets/images/省市区@2x.png" width="20" >
      </mt-cell>
      </a>
      <mt-cell title="请输入小区地址" >
        <img src="../../assets/images/返回@2x.png" alt="" width="8" height="14">
        <img slot="icon" src="../../assets/images/地址@2x.png" width="20" >
      </mt-cell>
      <div class="address-details">
        <img src="../../assets/images/请输入详细楼号@2x.png" width="20" >
        <input type="text" placeholder="请输入详细楼号">
      </div>
      <div class="submit">
        <mt-button type="danger" size="large">保存</mt-button>
      </div>
      <mt-popup
        v-model="popupVisible"
        position="bottom">
        <mt-picker
          :slots="slots"
          :showToolbar=true
          @change="onValuesChange">
          <div class="title">
            <span>取消</span>
            <span>确定</span>
          </div>
        </mt-picker>
      </mt-popup>
    </div>
  </div>
</template>
<script>
  import {Cell, Header, Button, Picker, Popup} from 'mint-ui'
  import Axios from 'axios'
  Axios.defaults.baseURL = 'http://a.com'
  export default {
    name: 'addHouse',
    mounted () {
    },
    data () {
      return {
        popupVisible: false,
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'right'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'left'
          }
        ]
      }
    },
    methods: {
      onValuesChange () {

      },
      popUp () {
        this.popupVisible = true
      }
    },
    components: {
      Cell,
      mtHeader: Header,
      mtButton: Button,
      Picker,
      Popup
    }
  }
</script>

<style scoped>
#add .address-details{
  margin-left: 5%;
  border-top: 1px solid #ddd;
  padding: 0 10px;
  height: 48px;
  line-height: 48px;
}
#add .address-details img{
  vertical-align: middle;
}
#add .address-details input{
  border: none;
  outline: none;
  vertical-align: middle;
  margin-left: 20px;
}
#add .submit{
  top:300px;
}
#add .mint-popup{
  width: 100%;
}
#add .title {
  overflow: hidden;
  padding: 10px;
  border: 1px solid #ddd;
}
#add .title span:first-child,#add .title span:last-child{
  float: left;
  font-size: 16px;
  color: royalblue;
}
#add .title span:last-child{
  float: right;
}
</style>
