<template>
      <div class="houseItem" @click="goChangeHouse(houseInfo.id)">
        <img src="../assets/images/vip标识@2x.png" class="vipImg"  v-if="vipIsOrNo">
        <img src="../assets/images/vip灰色@2x.png" class="vipImg" v-else @click.stop="joinVip">
        <div style="padding-top: 30px">
          <div class="houseAddress">
            <img src="../assets/images/地址@2x.png" class="addressImg">
            <span>{{district}}</span><span>{{houseInfo.address}}</span><span>{{houseInfo.buildingNo}}</span>
          </div>
          <div class="houseInfo">
            <span>{{houseInfo.bedRoom}}&nbsp;居室&nbsp;/</span>
            <span>{{bedNum}}&nbsp;张床&nbsp;/</span>
            <span>{{houseInfo.doorWayName}}</span>
          </div>
        </div>
        <div class="houseBtn">
          <button class="oneClick" v-if="upAndDown == 'offLine'" @click.stop="easyUp">一键上架</button>
          <button class="oneClick" v-else @click.stop="pushOrderBefore">一键下单</button>
          <button class="joinVIP" v-if="!vipIsOrNo" @click.stop="joinVip">加入VIP</button>
        </div>
      </div>
</template>
<script>
  import Axios from 'axios'
  import _ from 'lodash'
  import province from '../assets/db/province.json'
  import city from '../assets/db/city.json'
  import area from '../assets/db/area.json'
  Axios.defaults.baseURL = 'http://a.com'
  export default{
    props: ['houseInfo'],
    data () {
      return {
        vipIsOrNo: this.houseInfo.vip,
        upAndDown: this.houseInfo.status,
        bedNum: '',
        district: ''
      }
    },
    methods: {
      easyUp: function () {
        let that = this
        Axios.post('/api/house/online/' + this.houseInfo.id + '/normal', {headers: {
          'Content-Type': 'application/json',
          'x-api-token': localStorage.token
        }}).then(function (data) {
          if (data.data.message === 'isOk') {
            that.$indicator.open('上架中')
            setTimeout(() => {
              that.$indicator.close()
              that.upAndDown = ''
              that.$router.go(0)
            }, 500)
          } else {
            that.$toast({
              message: '您的登录已过期',
              position: 'bottom'
            })
          }
        })
      },
      goChangeHouse: function (key) {
        let that = this
        sessionStorage.huhu_status = that.houseInfo.status
        sessionStorage.huhu_key = key
        sessionStorage.huhu_province = province.provinces.filter(function (pp) {
          return pp.provinceID === that.houseInfo.province
        })[0].provincename
        sessionStorage.huhu_province += city.citys.filter(function (pp) {
          return pp.cityID === that.houseInfo.city
        })[0].cityname
        sessionStorage.huhu_province += area.areas.filter(function (pp) {
          return pp.areaID === that.houseInfo.district
        })[0].areaname
        let obj = {
          province: that.houseInfo.province,
          city: that.houseInfo.city,
          district: that.houseInfo.district
        }
        sessionStorage.huhu_addressID = JSON.stringify(obj)
        sessionStorage.huhu_address = this.houseInfo.address
        sessionStorage.huhu_No = this.houseInfo.buildingNo
        sessionStorage.huhu_wholeAddress = sessionStorage.huhu_province + sessionStorage.huhu_address + sessionStorage.huhu_No
        sessionStorage.huhu_houseType = this.houseInfo.bedRoom + '居室'
        var str = this.houseInfo.bedAmount
        if (str.indexOf('1.35') === -1) {
          sessionStorage.huhu_smallBed = false
        } else {
          sessionStorage.huhu_smallBed = str[str.indexOf('1.35') + 5]
        }
        if (str.indexOf('1.5') === -1) {
          sessionStorage.huhu_middleBed = false
        } else {
          sessionStorage.huhu_middleBed = str[str.indexOf('1.5') + 4]
        }
        if (str.indexOf('1.8') === -1) {
          sessionStorage.huhu_bigBed = false
        } else {
          sessionStorage.huhu_bigBed = str[str.indexOf('1.8') + 4]
        }
        // 保存床位数据
        sessionStorage.huhu_bedNum = sessionStorage.huhu_smallBed === 'false' ? '' : `${sessionStorage.huhu_smallBed}床1.35m,`
        sessionStorage.huhu_bedNum += sessionStorage.huhu_middleBed === 'false' ? '' : `${sessionStorage.huhu_middleBed}床1.5m,`
        sessionStorage.huhu_bedNum += sessionStorage.huhu_bigBed === 'false' ? '' : `${sessionStorage.huhu_bigBed}床1.8m,`
        sessionStorage.huhu_gateType = this.houseInfo.doorWayName
        sessionStorage.huhu_dcr = this.houseInfo.dcr
        sessionStorage.huhu_wifiProfile = this.houseInfo.wifiName
        sessionStorage.huhu_wifiPwd = this.houseInfo.wifiPwd
        sessionStorage.huhu_id = this.houseInfo.id
        sessionStorage.huhu_vip = this.houseInfo.vip
//        this.$router.push({name: 'changeHouse', params: { houseInfo: this.houseInfo }})
        this.$router.push({name: 'changeHouse'})
      },
//      跳转并存储要用的值
      pushOrderBefore: function () {
        let that = this
        Promise.resolve((() => {
          sessionStorage.orderUseHouesId = that.houseInfo.id
          sessionStorage.orderUseHouesProvince = that.houseInfo.province
          sessionStorage.orderUseHouesCity = that.houseInfo.city
          sessionStorage.orderUseHouesRoom = that.houseInfo.bedRoom
          sessionStorage.orderUseHouesVip = that.houseInfo.vip
          sessionStorage.orderUseHouesforegift = that.houseInfo.foregift
          sessionStorage.huhu_bedNum = that.bedNum
          sessionStorage.huhu_province = that.houseInfo.province
          sessionStorage.huhu_city = that.houseInfo.city
          sessionStorage.huhu_key = that.houseInfo.id
        })()
        )
          .then(
            this.$router.push('/home/pushOrderBefore')
          )
      },
      joinVip: function () {
        let vm = this
        Promise.resolve((() => {
          sessionStorage.huhu_bedNum = vm.bedNum
          sessionStorage.huhu_province = vm.houseInfo.province
          sessionStorage.huhu_city = vm.houseInfo.city
          sessionStorage.huhu_key = vm.houseInfo.id
        })()
        )
          .then(
            this.$router.push('/user/vip/joinVip')
          )
      },
//      计算有几张床
      howBed: function () {
        let array = this.houseInfo.bedAmount.split(',').join(':').split(':')
        let evens = _.filter(array, function (n, i) {
          return i % 2 !== 0
        })
//      reduce() js原生高级函数。 parseInt() 解析一个数字字符串，并返回一个整数。
        this.bedNum = evens.reduce(function (x, y) {
          return parseInt(x) + parseInt(y)
        })
      },
      //  用区名替换数字区码
      getDistrict: function () {
        let that = this
        if (this.houseInfo.district === 'null') {
          this.district = ''
        } else {
          this.district = area.areas.filter(function (pp) {
            return pp.areaID === that.houseInfo.district
          })[0].areaname
        }
      }
    },
    mounted: function () {
      this.howBed()
      this.getDistrict()
    }
  }
</script>
<style scoped>
  .vipImg{
    width: 35px;
    height: 35px;
    position: absolute;
    top: 0;
    left: -1px;
    display: block;
  }
  .houseItem{
    margin-bottom: 15px;
    padding-left: 25px;
    padding-bottom: 25px;
    border-radius: 5px;
    background: url("../assets/images/房东首页框2@2x.png") center no-repeat;
    background-size: 100% 100%;
    position: relative;
  }
  .houseAddress{
    font-size: 15px;
    margin-bottom: 15px;
    position: relative;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .addressImg{
    width: 11px;
    height: 14px;
    position: absolute;
    top:4px;
    left:-14px;
  }
  .houseInfo{
    padding-bottom: 25px;
  }
  .houseInfo span{
    font-size: 12px;
    margin-right: 4px;
  }
  .houseAddress,.houseInfo{
    color: #8c8c8c;
  }
  .houseBtn button{
    font-size:13px;
    padding: 0;
  }
  .houseBtn .oneClick{
    border: none;
    border-radius: 5px;
    background:-webkit-linear-gradient(left,#74a92e,#aecd43);
    color: #fff;
    outline: none;
    width: 100px;
    height: 27px;
    margin-right: 40px;
  }
  .houseBtn .joinVIP{
    border: 1px solid #79ac36;
    border-radius: 5px;
    background: #fff;
    color: #79ac36;
    outline: none;
    width: 100px;
    height: 27px;
  }
</style>
