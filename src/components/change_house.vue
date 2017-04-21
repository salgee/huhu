<template>
  <div id="changeHouse">
    <mt-header title="修改房源" style="background: #79ac36;">
      <mt-button icon="back" slot="left" @click="clearAdData"></mt-button>
      <span slot="right" v-if="changeOrSave === 'change'" @click="change">编辑</span>
      <span slot="right" v-else @click="updateHouse">保存</span>
    </mt-header>
    <div class="content">
      <mt-cell title="地址" to="/home/addHouse/address">
        <span v-if="address">{{address}}</span>
        <img v-else src="../assets/images/返回@2x.png" alt="" width="8" height="14">
        <img slot="icon" src="../assets/images/地址@2x.png" width="20" >
      </mt-cell>
      <a @click="popUp">
        <mt-cell title="房型" @click="console.log(1)">
          <span v-if="houseType">{{houseType}}</span>
          <img v-else src="../assets/images/返回@2x.png" alt="" width="8" height="14">
          <img slot="icon" src="../assets/images/房型@2x.png" width="20" >
        </mt-cell>
      </a>
      <a @click="houseTypeCheck">
        <mt-cell title="面积">
          <span v-if="houseType">{{houseArea[houseType]}}</span>
          <img v-else src="../assets/images/返回@2x.png" alt="" width="8" height="14">
          <img slot="icon" src="../assets/images/面积@2x.png" width="20" >
        </mt-cell>
      </a>
      <mt-cell title="床位数" to="/home/addHouse/bedInfo">
        <span v-if="bedInfo">{{bedInfo}}</span>
        <img v-else src="../assets/images/返回@2x.png" alt="" width="8" height="14">
        <img slot="icon" src="../assets/images/床位数@2x.png" width="20" >
      </mt-cell>
      <a @click="popUp1">
        <mt-cell title="入门方式">
          <span v-if="gateType">{{gateType}}</span>
          <img v-else src="../assets/images/返回@2x.png" alt="" width="8" height="14">
          <img slot="icon" src="../assets/images/入户方式@2x.png" width="20" >
        </mt-cell>
      </a>
      <mt-cell title="需要门卡">
        <input type="checkbox" style="width: 16px; height: 16px" v-model="dcr" >
        <img slot="icon" src="../assets/images/需要门卡@2x.png" width="20" >
      </mt-cell>
      <mt-cell title="wifi用户名">
        <input type="text" class="wifi" maxlength="25" placeholder="选填" v-model="wifiProfile">
        <img slot="icon" src="../assets/images/wifi用户名@2x.png" width="20" >
      </mt-cell>
      <mt-cell title="wifi密码">
        <input type="text" class="wifi" maxlength="25" placeholder="选填" v-model="wifiPwd">
        <img slot="icon" src="../assets/images/wifi密码@2x.png" width="20" >
      </mt-cell>
      <div class="notTouch" v-if="changeOrSave === 'change'" @click="toastB"></div>
    </div>
    <div class="submit">
      <mt-button type="danger" size="large" @click="goDown" v-if="upAndDown">下架</mt-button>
      <mt-button type="danger" size="large" @click="goUp" v-else>上架</mt-button>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <mt-picker
        :slots="slots"
        :showToolbar=true
        :visibleItemCount=3
        @change="onValuesChange">
        <div class="title">
          <span @click="popupVisible=false">取消</span>
          <span @click="setHouseType">确定</span>
        </div>
      </mt-picker>
    </mt-popup>
    <mt-popup
      v-model="popupVisible1"
      position="bottom">
      <mt-picker
        :slots="slots1"
        :showToolbar=true
        :visibleItemCount=3
        @change="onValuesChange1">
        <div class="title">
          <span @click="popupVisible1=false">取消</span>
          <span @click="setGateType">确定</span>
        </div>
      </mt-picker>
    </mt-popup>
  </div>
</template>
<script>
  import {Cell, Header, Button, Picker, Popup, Toast} from 'mint-ui'
  import Axios from 'axios'
  import json from '../assets/db/houseInfo.json'
  Axios.defaults.baseURL = 'http://a.com'
  export default {
    name: 'addHouse',
    data () {
      return {
        upAndDown: true,
        changeOrSave: sessionStorage.overchangeorsave,
//        OriginalInfo: this.$route.params.houseInfo,
        address: sessionStorage.huhu_wholeAddress,
//        sessionStorage.huhu_wholeAddress应该是组件中存储的
        popupVisible: false,
        popupVisible1: false,
        houseType: sessionStorage.huhu_houseType,
        gateType: sessionStorage.huhu_gateType,
        selected: '',
        selected1: '',
        dcr: sessionStorage.huhu_dcr === '1',
        bedInfo: sessionStorage.huhu_bedNum,
//        sessionStorage.huhu_bedNum组件中存储的
        wifiProfile: sessionStorage.huhu_wifiProfile || '',
        wifiPwd: sessionStorage.huhu_wifiPwd || '',
        houseArea: {
          '1居室': '20-65', '2居室': '40-100', '3居室': '60-130', '4居室': '80-160'
        },
        slots: [
          {
            flex: 1,
            values: ['1居室', '2居室', '3居室', '4居室'],
            className: 'slot1',
            textAlign: 'center',
            defaultIndex: 1
          }
        ],
        slots1: [
          {
            flex: 1,
            values: ['密码', '钥匙'],
            className: 'slot1',
            textAlign: 'center',
            defaultIndex: 1
          }
        ]
      }
    },
    watch: {
      dcr (val) {
        sessionStorage.huhu_dcr = val
      },
      wifiProfile (val) {
        sessionStorage.huhu_wifiProfile = val
      },
      wifiPwd (val) {
        sessionStorage.huhu_wifiPwd = val
      }
    },
    mounted: function () {
//      判断是上架还是下架
      if (sessionStorage.huhu_status === 'normal') {
        this.upAndDown = true
      } else {
        this.upAndDown = false
      }
//      重新定义亲求头
      Axios.defaults.headers = {
        'Content-Type': 'application/json',
        'x-api-token': localStorage.token
      }
    },
    methods: {
      goDown: function () {
        let that = this
        Axios.post('/api/house/online/' + sessionStorage.huhu_key + '/offLine'
        ).then(function (data) {
          if (data.data.message === 'isOk') {
            that.$indicator.open('下架中')
            setTimeout(() => {
              that.$indicator.close()
              that.upAndDown = false
            }, 1000)
          } else {
            that.$toast({
              message: '您的登录已过期',
              position: 'bottom'
            })
          }
        })
      },
      goUp: function () {
        let that = this
        Axios.post('/api/house/online/' + sessionStorage.huhu_key + '/normal'
        ).then(function (data) {
          if (data.data.message === 'isOk') {
            that.$indicator.open('上架中')
            setTimeout(() => {
              that.$indicator.close()
              that.upAndDown = true
            }, 1000)
          } else {
            that.$toast({
              message: '您的登录已过期',
              position: 'bottom'
            })
          }
        })
      },
      change: function () {
        if (this.changeOrSave === 'change') {
          sessionStorage.overchangeorsave = 'save'
          this.changeOrSave = 'save'
        }
      },
      toastB: function () {
        this.$toast({
          message: '请点击编辑进行修改',
          position: 'bottom',
          duration: 2000
        })
      },
      clearAdData () {
        let vm = this
        Promise.resolve(
          sessionStorage.clear()
        ).then(
          () => {
            vm.$router.push('/home')
          }
        )
      },
      popUp () {
        let vm = this
        if (vm.address === undefined) {
          Toast({
            message: '请先选择正确的省市区',
            position: 'bottom',
            duration: 2000
          })
        } else {
          vm.popupVisible = true
        }
      },
      popUp1 () {
        this.popupVisible1 = true
      },
      onValuesChange (picker, values) {
        this.selected = values[0]
      },
      onValuesChange1 (picker, values) {
        this.selected1 = values[0]
      },
      setHouseType () {
        let vm = this
        sessionStorage.huhu_houseType = vm.houseType = vm.selected
        vm.popupVisible = false
      },
      setGateType () {
        let vm = this
        sessionStorage.huhu_gateType = vm.gateType = vm.selected1
        vm.popupVisible1 = false
      },
      houseTypeCheck () {
        if (this.houseType === undefined) {
          Toast({
            message: '请先选择房型',
            position: 'bottom',
            duration: 2000
          })
        }
      },
      updateHouse () {
        let vm = this
        if (vm.address === undefined) {
          Toast({
            message: '请选择地址',
            position: 'bottom',
            duration: 2000
          })
          return
        }
        if (vm.houseType === undefined) {
          Toast({
            message: '请选择房型',
            position: 'bottom',
            duration: 2000
          })
          return
        }
        if (vm.bedInfo === undefined) {
          Toast({
            message: '请选择床位',
            position: 'bottom',
            duration: 2000
          })
          return
        }
        if (vm.gateType === undefined) {
          Toast({
            message: '请选择入门方式',
            position: 'bottom',
            duration: 2000
          })
          return
        }
        let id = JSON.parse(sessionStorage.huhu_addressID)
        json.province = id.province
        json.city = id.city
        json.district = id.district
        json.address = sessionStorage.huhu_address
        json.buildingNo = sessionStorage.huhu_No
        json.area = vm.houseArea[vm.houseType]
        json.bedRoom = sessionStorage.huhu_houseType.slice(0, 1)
        let bedAmount = sessionStorage.huhu_smallBed !== 'false' ? `1.35:${sessionStorage.huhu_smallBed},` : ''
        bedAmount += sessionStorage.huhu_middleBed !== 'false' ? `1.5:${sessionStorage.huhu_middleBed},` : ''
        bedAmount += sessionStorage.huhu_bigBed !== 'false' ? `1.8:${sessionStorage.huhu_bigBed},` : ''
        json.bedAmount = bedAmount.slice(0, -1)
        json.doorWay = sessionStorage.huhu_gateType === '钥匙' ? 'key' : 'password'
        json.dcr = Number(Boolean(sessionStorage.huhu_dcr))
        json.wifiName = sessionStorage.huhu_wifiProfile
        json.wifiPwd = sessionStorage.huhu_wifiPwd
        json.foregift = 123.67
        json.id = sessionStorage.huhu_id
        Axios.post('/api/house/update',
          json, {
            headers: {
              'Content-Type': 'application/json',
              'x-api-token': localStorage.token
            }
          }).then(function (data) {
            if (data.data.message === 'isOk') {
              Toast({
                message: '修改成功',
                position: 'bottom',
                duration: 2000
              })
              sessionStorage.clear()
              vm.$router.push('/home')
            } else {
              Toast({
                message: data.data.message,
                position: 'bottom',
                duration: 2000
              })
            }
          })
      }
    },
    components: {
      Cell,
      mtHeader: Header,
      mtButton: Button,
      Picker,
      Popup,
      Toast
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
  #changeHouse{
    width: 100vw;
    height: 100vh;
    background-color: #ededed;
  }
  #changeHouse .mint-cell-value{
    max-width: 70%;
    font-size: 12px;
  }
  #changeHouse .mint-cell-value span {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  #changeHouse .mint-cell-wrapper {
    width: 95%;
    margin-left: 5%;
  }
  #changeHouse .mint-cell-title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  #changeHouse .mint-cell-title span{
    font-size: 13px;
    margin-left: 20px;
  }
  #changeHouse .content{
    color: #000;
    background-color: #fff;
    margin-top: 10px;
    font-size: 0;
    position: relative;
  }
  .notTouch{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9999;
  }
  #changeHouse .wifi{
    border: none;
    outline: none;
    text-align: right;
  }
  #changeHouse .submit{
    position: absolute;
    bottom: 60px;
    right: 0;
    left: 0;
    margin: auto;
    width: 80%;
    text-align: center;
  }
  #changeHouse .submit button{
    background-color: #79ac36;
    box-shadow: 0 4px 0 -1px #ddd;
  }
  #changeHouse .mint-cell{
    background-image: none;
  }
  #changeHouse .content>.mint-cell:first-child .mint-cell-wrapper ,.city .mint-cell-wrapper{
    background-image: none;
  }
  .mint-toast {
    font-size: 12px !important;
  }
  #changeHouse .mint-popup{
    width: 100%;
  }
  #changeHouse .title {
    overflow: hidden;
    padding: 10px;
    border: 1px solid #ddd;
  }
  #changeHouse .title span:first-child,#changeHouse .title span:last-child{
    float: left;
    font-size: 16px;
    color: royalblue;
  }
  #changeHouse .title span:last-child{
    float: right;
  }
</style>
