<template>
  <div id="add">
    <mt-header title="地址详情" style="background: #79ac36;">
      <mt-button icon="back" slot="left" @click="clearAdData"></mt-button>
    </mt-header>
    <div class="content">
      <a class="city" @click="popUp">
      <mt-cell :title="title">
        <img src="../../assets/images/返回@2x.png" alt="" width="8" height="14">
        <img slot="icon" src="../../assets/images/省市区@2x.png" width="20" >
      </mt-cell>
      </a>
      <mt-cell :title="addressDet" to="/home/addHouse/address/map">
        <img src="../../assets/images/返回@2x.png" alt="" width="8" height="14">
        <img slot="icon" src="../../assets/images/地址@2x.png" width="20" >
      </mt-cell>
      <div display="none"></div>
      <div class="address-details">
        <img src="../../assets/images/请输入详细楼号@2x.png" width="20" >
        <input type="text" placeholder="请输入详细楼号" v-model="buldingNo">
      </div>
      <div class="submit">
        <mt-button type="danger" size="large" @click="saveWholeAddress">保存</mt-button>
      </div>
      <mt-popup
        v-model="popupVisible"
        position="bottom">
        <mt-picker
          :slots="slots"
          :showToolbar=true
          @change="onValuesChange">
          <div class="title">
            <span @click="popupVisible=false">取消</span>
            <span @click="saveAreaAddress">确定</span>
          </div>
        </mt-picker>
      </mt-popup>
    </div>
  </div>
</template>
<script>
  import {Cell, Header, Button, Picker, Popup, Toast} from 'mint-ui'
  import province from '../../assets/db/province.json'
  import city from '../../assets/db/city.json'
  import area from '../../assets/db/area.json'
  export default {
    name: 'addHouse',
    beforeRouteEnter (to, from, next) {
      if (from.path === '/user/changeHouse') {
        localStorage.add_address_fromPath = '/user/changeHouse'
        next()
      } else {
        next()
      }
    },
    mounted () {
      this.prv = province.provinces.map(
        (name) => name.provincename
      )
    },
    data () {
      return {
        popupVisible: false,
        selectedArea: '',
        seletedID: {},
        title: sessionStorage.huhu_province || '省、市、区',
        addressDet: sessionStorage.huhu_address || '请输入小区地址',
        buldingNo: sessionStorage.huhu_No || '',
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-',
            className: 'slot2'
          },
          {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-',
            className: 'center'
          },
          {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          }
        ],
        prv: ''
      }
    },
    methods: {
      onValuesChange (picker, values) {
        let vm = this
        if (values[0] === undefined) return
        // 过滤省级列表获取省级id
        let selPrv = province.provinces.filter(
          (name) => name.provincename === values[0]
        )
        // 用省级过滤市级列表
        let cities = city.citys.filter(
          (name) => name.fatherID === selPrv[0].provinceID
        )
        // 将符合要求的市级列表返回
        vm.slots[2].values = cities.map(
          (name) => name.cityname
        )
        // 过滤市级列表获取市级id
        let selCity = cities.filter(
          (name) => name.cityname === values[1]
        )
        if (selCity[0] === undefined) return
        // 用省级过滤市级列表
        let areas = area.areas.filter(
          (name) => name.fatherID === selCity[0].cityID
        )
        // 将符合要求的区级列表返回
        vm.slots[4].values = areas.map(
          (name) => name.areaname
        )
        // 返回所在地区区号
        let selArea = areas.filter(
          (name) => name.areaname === values[2]
        )
        if (selArea[0] === undefined) return
        vm.selectedArea = values.join('')
        // 保存省市区ID
        if (selPrv[0].provinceID !== '310000') return
        vm.seletedID.province = selPrv[0].provinceID
        vm.seletedID.city = selCity[0].cityID
        vm.seletedID.district = selArea[0].areaID
        sessionStorage.huhu_addressID = JSON.stringify(vm.seletedID)
      },
      popUp () {
        this.slots[0].values = this.prv
        this.popupVisible = true
      },
      saveAreaAddress () {
        let vm = this
        if (vm.selectedArea.indexOf('上海') === -1) {
          Toast({
            message: '该地区下没有配置房源，请精确到选择省市后在确定',
            position: 'bottom',
            duration: 2000
          })
        } else {
          vm.title = sessionStorage.huhu_province = vm.selectedArea
        }
        this.popupVisible = false
      },
      saveWholeAddress () {
        let vm = this
        if (vm.title === '省、市、区') {
          Toast({
            message: '请选择省市区',
            position: 'bottom',
            duration: 2000
          })
          return
        }
        if (vm.addressDet === '请输入小区地址') {
          Toast({
            message: '请选择小区地址',
            position: 'bottom',
            duration: 2000
          })
          return
        }
        if (vm.buldingNo === '') {
          Toast({
            message: '请选择详细楼号',
            position: 'bottom',
            duration: 2000
          })
          return
        }
        Promise.resolve((() => {
          let path = localStorage.add_address_fromPath || '/home/addHouse'
          localStorage.removeItem('add_address_fromPath')
          sessionStorage.huhu_No = vm.buldingNo
          sessionStorage.huhu_wholeAddress = sessionStorage.huhu_province + sessionStorage.huhu_address + sessionStorage.huhu_No
          return path
        })()
        ).then(
          (path) => {
            vm.$router.push(path)
          }
        )
      },
      clearAdData () {
        let vm = this
        Promise.resolve((() => {
          let path = localStorage.add_address_fromPath || '/home/addHouse'
          localStorage.removeItem('add_address_fromPath')
          if (sessionStorage.huhu_wholeAddress !== undefined) {
            return path
          }
          window.sessionStorage.removeItem('huhu_province')
          window.sessionStorage.removeItem('huhu_address')
          window.sessionStorage.removeItem('huhu_No')
          window.sessionStorage.removeItem('huhu_addressID')
          window.sessionStorage.removeItem('huhu_addressID')
          return path
        })()
        ).then(
          (path) => {
            vm.$router.push(path)
          }
        )
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
  margin-left: 8%;
  height: 48px;
  line-height: 48px;
  border-top: 1px solid #ddd;
}
#add .address-details img{
  vertical-align: middle;
}
#add .address-details input{
  border: none;
  outline: none;
  vertical-align: middle;
  width: 80%;
  margin-left: 25px;
  font-size: 15px;
}
#add .submit{
  top:300px;
}
</style>
