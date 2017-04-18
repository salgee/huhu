<template>
      <div class="houseItem" @click="goChangeHouse(houseInfo.id)">
        <img src="../assets/images/vip标识@2x.png" class="vipImg"  v-if="vipIsOrNo">
        <img src="../assets/images/vip灰色@2x.png" class="vipImg" v-else @click.stop="joinVip">
        <div class="houseAddress">
          <img src="../assets/images/地址@2x.png" class="addressImg">
          <span>{{district}}</span><span>{{houseInfo.address}}</span><span>{{houseInfo.buildingNo}}</span>
        </div>
        <div class="houseInfo">
          <span>{{houseInfo.bedRoom}}&nbsp;居室&nbsp;/</span>
          <span>{{bedNum}}&nbsp;张床&nbsp;/</span>
          <span>{{houseInfo.doorWayName}}</span>
        </div>
        <div class="houseBtn">
          <button class="oneClick" v-if="upAndDown == 'offLine'" >一键上架</button>
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
        sessionStorage.huhu_addressID = '{"province": "' + this.houseInfo.province + '", "city": "' + this.houseInfo.city + '", "district": "' + this.houseInfo.district + '"}'
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
//        this.$router.push({name: 'changeHouse', params: { houseInfo: this.houseInfo }})
        this.$router.push({name: 'changeHouse'})
      },
      pushOrderBefore: function () {
        this.$router.push('/home/pushOrderBefore')
      },
      joinVip: function () {
        Promise.resolve(
          sessionStorage.huhu_bedNum = this.bedNum
        )
          .then(
            this.$router.push('/user/joinVip')
          )
      },
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
    margin:10px;
    margin-bottom: 40px;
    border: 1px solid #edf3e6;
    padding: 20px 0;
    padding-top: 30px;
    padding-left: 25px;
    border-radius: 5px;
    background: #fff;
    position: relative;
  }
  .houseItem::after{
    width: 100%;
    border-radius: 5px;
    background: #c8dcaf;
    content: '';
    overflow: hidden;
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transform:rotate(-4deg) scale(1.015,0.98);
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
    margin-bottom: 25px;
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
