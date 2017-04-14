<template>
  <div id="add">
    <mt-header title="地址详情" style="background: #79ac36;">
      <mt-button icon="back" slot="left" @click="$router.push({name: 'add'})"></mt-button>
    </mt-header>
    <div class="content">
      <a @click="popUp">
      <mt-cell :title="title">
        <img src="../../assets/images/返回@2x.png" alt="" width="8" height="14">
        <img slot="icon" src="../../assets/images/省市区@2x.png" width="20" >
      </mt-cell>
      </a>
      <router-link :to="{ name: 'map'}">
        <mt-cell :title="addressDet" >
          <img src="../../assets/images/返回@2x.png" alt="" width="8" height="14">
          <img slot="icon" src="../../assets/images/地址@2x.png" width="20" >
        </mt-cell>
      </router-link>
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
          valueKey="provincename"
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
    mounted () {
      this.prv = province.provinces.map(
        (name) => name.provincename
      )
      this.addressDet = this.$route.params.address || '请输入小区地址'
    },
    data () {
      return {
        popupVisible: false,
        selectedArea: '',
        title: '省、市、区',
        addressDet: '',
        buldingNo: '',
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'left'
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
            className: 'right'
          },
          {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'left'
          }
        ],
        prv: ''
      }
    },
    methods: {
      onValuesChange (picker, values) {
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
        this.slots[2].values = cities.map(
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
        this.slots[4].values = areas.map(
          (name) => name.areaname
        )
        this.selectedArea = values.join('')
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
          vm.title = vm.selectedArea
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
  margin-left: 25px;
  font-size: 15px;
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
