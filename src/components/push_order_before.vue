<template>
  <div id="pushOrderBefore">
    <mt-header title="填写信息">
      <mt-button icon="back" slot="left" @click="clearAdData"></mt-button>
    </mt-header>
    <div class="pushInfo">
      <mt-cell title="接待方式">
        <img slot="icon" src="../assets/images/客户接待@2x.png" width="20" @click="openPicker">
        <img src="../assets/images/返回@2x.png" width="8" height="14" v-if="reception==''" @click="openPicker">
        <span v-model="reception" v-else @click="openPicker">{{reception}}</span>
      </mt-cell>
      <mt-cell title="接引时间" @click.native="userSelf">
        <img slot="icon" src="../assets/images/接引时间@2x.png" width="20" @click.stop="openReceiveTime">
        <img src="../assets/images/返回@2x.png" width="8" height="14"  v-if="receive==''" @click.stop="openReceiveTime" v-show="byUserSelf">
        <span v-model="receive" v-else @click.stop="openReceiveTime">{{receive}}</span>
      </mt-cell>
      <mt-cell title="清洁时间">
        <img slot="icon" src="../assets/images/清洁时间@2x.png" width="20" @click.stop="openClean">
        <img src="../assets/images/返回@2x.png" width="8" height="14" v-if="clean==''" @click.stop="openClean">
        <span v-model="receive" v-else @click.stop="openClean">{{clean}}</span>
      </mt-cell>
      <mt-cell title="入住人姓名">
        <img slot="icon" src="../assets/images/入住人姓名@2x.png" width="20" >
        <input type="text" maxlength="15"  class="guest" v-model="checkInPerson">
      </mt-cell>
      <mt-cell title="入住人联系方式">
        <img slot="icon" src="../assets/images/入住人联系方式@2x.png" width="20" >
        <input type="text" maxlength="11"  class="guest" v-model="checkInPhone">
      </mt-cell>
    </div>
    <div class="vipGoods" v-if="vip === '1'">
      <img src="../assets/images/额外服务@2x.png" width="20">
      <div class="vipGoodsTitle">额外服务<span v-if="ifExtra">(当前城市可提供布草服务)</span><span v-else>(当前城市不提供布草服务)</span></div>
      <div style="float: right" v-if="ifExtra" @click="goGoods"><img src="../assets/images/返回@2x.png" width="8" height="14" ></div>
    </div>
    <div class="showVipGoods" v-if="oneGoods !== ''">
      <table>
        <tr style="border-top: none">
          <td>{{oneGoods}}x{{oneGoodsNum}}</td>
          <td style="text-align: left; width: 15%">￥:&nbsp;{{oneGoodsAllPrice}}</td>
          <td style="text-align: left;">总押金&nbsp;:&nbsp;{{foregiftAll}}元</td>
        </tr>
        <tr v-for="extraGood in extraGoods">
          <td>{{extraGood.productName}}x{{extraGood.quantity}}</td>
          <td style="text-align: left;width: 15%">￥:&nbsp;{{extraGood.price}}</td>
          <td></td>
        </tr>
      </table>
    </div>
    <div class="serviceCharge">
      <div class="serviceLeft">
        <img src="../assets/images/服务费@2x.png">
        <span>服务费</span>
      </div>
      <div class="serviceRight" v-if="vip === '0'">
        <span class="vipPrice">(VIP价￥{{servicePrice}})</span>
        <span>￥{{price}}</span>
        <div><router-link tag="span" class="joinVip" to="/user/vip/joinVip">申请VIP</router-link></div>
      </div>
      <div class="serviceRight" v-else>
        <span class="vipPrice">(非VIP价￥{{price}})</span>
        <span>￥{{servicePrice}}</span>
      </div>
    </div>
    <div class="pushOrder">
      <div v-if="vip === '0'">合计:￥{{price}}</div>
      <div v-else>合计:￥{{vipPrice}}</div>
      <button class="btn" @click="goOrder">我要下单</button>
    </div>
    <!--接待方式-->
    <mt-popup v-model="popupReception" position="bottom" >
      <mt-picker :slots="receptionSlots" :showToolbar="true" @change="getValue" :visibleItemCount="3">
        <div class="pickerTitle">
          <div style="text-align: left;"><span @click="receptionCancel">取消</span></div>
          <div style="text-align: right;color:#74a92e"><span @click="getReception">确定</span></div>
        </div>
      </mt-picker>
    </mt-popup>
    <!--接待时间-->
    <mt-popup v-model="popupReceive" position="bottom">
      <mt-picker :slots="ReceiveSlots" :showToolbar="true" @change="getReceiveTimeValue">
        <div class="pickerTitle">
          <div style="text-align: left;"><span @click="receiveCancel">取消</span></div>
          <div style="text-align: right;color:#74a92e"><span @click="getReceive">确定</span></div>
        </div>
      </mt-picker>
    </mt-popup>
    <!--清洁时间-->
    <mt-popup v-model="popupClean" position="bottom">
      <mt-picker :slots="cleanSlots" :showToolbar="true" @change="getCleanTime">
        <div class="pickerTitle">
          <div style="text-align: left;"><span @click="cleanCancel">取消</span></div>
          <div style="text-align: right;color:#74a92e"><span @click="cleanGet">确定</span></div>
        </div>
      </mt-picker>
    </mt-popup>
  </div>
</template>
<script>
  import Axios from 'axios'
  import moment from 'moment'
  moment.locale('zh-cn')
  Axios.defaults.baseURL = 'http://a.com'
  export default{
    mounted () {
      Axios.defaults.headers = {
        'Content-Type': 'application/json',
        'x-api-token': localStorage.token
      }
      this.extra()
      if (sessionStorage.hehereception !== undefined) {
        this.reception = sessionStorage.hehereception
        if (this.reception === '自主入住') {
          this.byUserSelf = false
          this.receptionType = 'byYourself'
        } else {
          this.byUserSelf = true
          this.receptionType = 'byGuide'
        }
      }
      if (sessionStorage.hehereceive !== undefined && sessionStorage.hehereception !== '自主入住') {
        this.receive = sessionStorage.hehereceive
      }
      if (sessionStorage.heheclean !== undefined) {
        this.clean = sessionStorage.heheclean
      }
      if (sessionStorage.hehecheckInPerson !== undefined) {
        this.checkInPerson = sessionStorage.hehecheckInPerson
      }
      if (sessionStorage.hehecheckInPhone !== undefined) {
        this.checkInPhone = sessionStorage.hehecheckInPhone
      }
      if (sessionStorage.orderDetailList !== undefined && sessionStorage.orderDetailList !== '[]') {
        this.orderDetailList = JSON.parse(sessionStorage.orderDetailList)
        this.oneGoods = JSON.parse(sessionStorage.orderDetailList)[0].productName
        this.oneGoodsNum = JSON.parse(sessionStorage.orderDetailList)[0].quantity
        this.oneGoodsAllPrice = JSON.parse(sessionStorage.orderDetailList)[0].price
        for (let i = 0; i < JSON.parse(sessionStorage.orderDetailList).length; i++) {
          this.foregiftAll += Number(JSON.parse(sessionStorage.orderDetailList)[i].foregift)
        }
        for (let i = 0; i < JSON.parse(sessionStorage.orderDetailList).length; i++) {
          this.AllPrice += Number(JSON.parse(sessionStorage.orderDetailList)[i].price)
          this.AllPrice += Number(JSON.parse(sessionStorage.orderDetailList)[i].foregift)
        }
        let abc = JSON.parse(sessionStorage.orderDetailList)
        abc.splice(0, 1)
        this.extraGoods = abc
      }
      this.howPrice()
    },
    methods: {
//      判断该城市是否支持额外服务
      extra: function () {
        let that = this
        Axios.get('/api/manage/material/findByProvince/' + sessionStorage.orderUseHouesProvince + '/' + sessionStorage.orderUseHouesCity
        ).then(function (data) {
          if (data.data.message === 'isOk') {
            that.ifExtra = true
          } else {
            that.ifExtra = false
          }
        })
      },
//      存用户之前选好的值，并跳转到商品页面
      goGoods: function () {
        let that = this
        Promise.resolve((() => {
          sessionStorage.hehecheckInPerson = that.checkInPerson
          sessionStorage.hehecheckInPhone = that.checkInPhone
        })()
        )
          .then(
            this.$router.push('/home/pushOrderBefore/vipGoods')
          )
      },
//      根据省市获取服务费
      howPrice: function () {
        let that = this
        Axios.post('/api/manage/houseFeeConfig/houseFeeConfigDetailsByProvince', {
          province: sessionStorage.orderUseHouesProvince,
          city: sessionStorage.orderUseHouesCity
        }
        ).then(function (data) {
          if (sessionStorage.orderUseHouesRoom === '1') {
            that.servicePrice = data.data.data[0].vipPrice
            that.vipPrice = Number(data.data.data[0].vipPrice + Number(that.AllPrice)).toFixed(2)
            that.price = data.data.data[0].price
          } else if (sessionStorage.orderUseHouesRoom === '2') {
            that.servicePrice = data.data.data[1].vipPrice
            that.vipPrice = Number(data.data.data[1].vipPrice + Number(that.AllPrice)).toFixed(2)
            that.price = data.data.data[1].price
          } else if (sessionStorage.orderUseHouesRoom === '3') {
            that.servicePrice = data.data.data[2].vipPrice
            that.vipPrice = Number(data.data.data[2].vipPrice + Number(that.AllPrice)).toFixed(2)
            that.price = data.data.data[2].price
          } else if (sessionStorage.orderUseHouesRoom === '4') {
            that.servicePrice = data.data.data[3].vipPrice
            that.vipPrice = Number(data.data.data[3].vipPrice + Number(that.AllPrice)).toFixed(2)
            that.price = data.data.data[3].price
          }
        })
          .catch(function (error) {
            that.$toast({
              message: error,
              position: 'bottom',
              duration: 2000
            })
          })
      },
//    获取服务费
      getServiceFee: function () {
        if (this.vip === '0') {
          return this.price
        } else {
          return this.vipPrice
        }
      },
//      获取总金额
      getTotalAmount: function () {
        if (this.vip === '0') {
          return Number(Number(this.price) + Number(sessionStorage.orderUseHouesforegift)).toFixed(2)
        } else {
//          额外收费项目
          return Number(Number(this.vipPrice) + Number(sessionStorage.orderUseHouesforegift)).toFixed(2)
        }
      },
//    立即下单接口
      goOrder: function () {
        if (this.receptionType === '') {
          this.$toast({
            message: '请选择接待方式',
            position: 'bottom'
          })
          return
        } else {
          if (this.reception === '接引客户' && this.receive === '') {
            this.$toast({
              message: '请选择接引时间',
              position: 'bottom'
            })
            return
          } else {
            if (this.clean === '') {
              this.$toast({
                message: '请选择清洁时间',
                position: 'bottom'
              })
              return
            } else {
              if (this.checkInPerson === '') {
                this.$toast({
                  message: '请输入入住人姓名',
                  position: 'bottom'
                })
                return
              } else {
                if (this.checkInPhone === '') {
                  this.$toast({
                    message: '请输入入住人联系方式',
                    position: 'bottom'
                  })
                  return
                } else if (!/^1[34578]\d{9}$/.test(this.checkInPhone)) {
                  this.$toast({
                    message: '请输入正确的手机号码',
                    position: 'bottom'
                  })
                  return
                } else {
                  let that = this
                  Axios.post('/api/order/addOrder/' + sessionStorage.orderUseHouesId, {
//                  总金额
                    totalAmount: that.getTotalAmount(),
//                  押金
                    foregift: sessionStorage.orderUseHouesforegift,
//                  服务费
                    serviceFee: that.getServiceFee(),
//                  入住方式
                    receptionType: that.receptionType,
//                  开始打扫时间
                    serviceTimeFrom: that.Unix(that.clean),
//                  结束打扫时间
                    serviceTimeTo: that.UnixEnd(that.clean),
//                  接引开始时间
                    receptionTimeFrom: that.Unix(that.receive),
//                  接引结束时间
                    receptionTimeTo: that.UnixEnd(that.receive),
                    checkInPerson: that.checkInPerson,
                    checkInPhone: that.checkInPhone,
//                  额外服务
                    orderDetailList: that.orderDetailList
                  }
                  ).then(function (data) {
                    console.log(data)
                    if (data.data.message === 'isOk') {
                      Promise.resolve((() => {
                        sessionStorage.clear()
                        that.$toast({
                          message: '下单成功',
                          position: 'bottom'
                        })
                      })()
                      )
                        .then(
                          that.$router.push('/home')
                        )
                    } else {
                      that.$toast({
                        message: '请勿同时段重复下单',
                        position: 'bottom'
                      })
                    }
                  })
                }
              }
            }
          }
        }
      },
//    处理数据成时间戳
      Unix: function (mmp) {
        let str = mmp.slice(0, 10) + '-' + mmp.slice(14, 16) + '-' + mmp.slice(17, 19)
        return Number(moment(str.split('-')).unix()) - 2649600
      },
      UnixEnd: function (mmp) {
        let str = mmp.slice(0, 10) + '-' + mmp.slice(20, 22) + '-' + mmp.slice(23, 25)
        return Number(moment(str.split('-')).unix()) - 2649600
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
//  -------------------------------接待方式popup和picker
      openPicker: function () {
        this.popupReception = true
      },
      receptionCancel: function () {
        this.popupReception = false
      },
      getReception: function () {
        this.receive = ''
        this.popupReception = false
        this.reception = this.saveReception
//      --------------------------------------------------------存值返回时填入
        sessionStorage.hehereception = this.saveReception
        if (this.reception === '自主入住') {
          this.byUserSelf = false
          this.receptionType = 'byYourself'
        } else {
          this.byUserSelf = true
          this.receptionType = 'byGuide'
        }
      },
      getValue: function (picker) {
        this.saveReception = picker.getValues()[0]
      },
//  -------------------------------接待时间popup和picker
      openReceiveTime: function () {
        if (this.reception === '') {
          this.$toast({
            message: '请先选择接待方式',
            position: 'bottom',
            duration: 1000
          })
        } else {
          this.popupReceive = true
        }
      },
      receiveCancel: function () {
        this.popupReceive = false
      },
      getReceive: function () {
        this.popupReceive = false
        this.receive = this.saveReceive
        //      --------------------------------------------------------存值返回时填入
        sessionStorage.hehereceive = this.receive
      },
      getReceiveTimeValue: function (picker, values) {
        this.saveReceive = picker.getValues()[0] + picker.getValues()[1]
        if (values[0] === JSON.parse(sessionStorage.days)[0]) {
          picker.setSlotValues(1, JSON.parse(sessionStorage.todayTime))
        } else {
          picker.setSlotValues(1, ['08:00-08:30', '08:30-09:00', '09:00-09:30', '09:30-10:00', '10:00-10:30', '10:30-11:00', '11:00-11:30', '11:30-12:00', '12:00-12:30', '12:30-13:00', '13:00-13:30', '13:30-14:00', '14:00-14:30', '14:30-15:00', '15:00-15:30', '15:30-16:00', '16:00-16:30', '16:30-17:00', '17:00-17:30', '17:30-18:00', '18:00-18:30', '18:30-19:00', '19:00-19:30', '19:30-20:00'])
          if (picker.getValues()[1] === JSON.parse(sessionStorage.todayTime)[0]) {
            picker.setSlotValue(1, ['08:00-08:30'])
          } else {
            return
          }
        }
      },
      userSelf: function () {
        if (this.reception === '自主入住') {
          this.$toast({
            message: '自主入住不用选择',
            position: 'bottom',
            duration: 1000
          })
        }
      },
//      -------------------------------------------------------打扫时间的popup和picker
      openClean: function () {
        if (this.reception === '') {
          this.$toast({
            message: '请先选择接待方式',
            position: 'bottom',
            duration: 1000
          })
        } else {
          this.popupClean = true
        }
      },
      getCleanTime: function (picker, values) {
        this.saveClean = picker.getValues()[0] + picker.getValues()[1]
        if (values[0] === JSON.parse(sessionStorage.days)[0]) {
          picker.setSlotValues(1, JSON.parse(sessionStorage.todayTime))
        } else {
          picker.setSlotValues(1, ['08:00-08:30', '08:30-09:00', '09:00-09:30', '09:30-10:00', '10:00-10:30', '10:30-11:00', '11:00-11:30', '11:30-12:00', '12:00-12:30', '12:30-13:00', '13:00-13:30', '13:30-14:00', '14:00-14:30', '14:30-15:00', '15:00-15:30', '15:30-16:00', '16:00-16:30', '16:30-17:00', '17:00-17:30', '17:30-18:00', '18:00-18:30', '18:30-19:00', '19:00-19:30', '19:30-20:00'])
          if (picker.getValues()[1] === JSON.parse(sessionStorage.todayTime)[0]) {
            picker.setSlotValue(1, ['08:00-08:30'])
          } else {
            return
          }
        }
      },
      cleanCancel: function () {
        this.popupClean = false
      },
      cleanGet: function () {
        this.popupClean = false
        this.clean = this.saveClean
        //      --------------------------------------------------------存值返回时填入
        sessionStorage.heheclean = this.clean
      }
    },
    data () {
      return {
//        商品列表
        extraGoods: '',
//        是否显示城市支持额外服务
        ifExtra: false,
//        商品总金额+总押金
        AllPrice: 0,
//        商品订单
        oneGoods: '',
        oneGoodsNum: '',
        oneGoodsAllPrice: '',
        foregiftAll: 0,
//      防止sessionStorage.orderDetailList无值时解析错误
        orderDetailList: [],
        vip: sessionStorage.orderUseHouesVip,
//        vip情况下合计总价
        vipPrice: '',
//        vip情况下的服务费
        servicePrice: '',
//        非vip情况下合计总价，和服务费
        price: '',
//        ---------------------存储接口需要的数据
        receptionType: '',
        checkInPerson: '',
        checkInPhone: '',
//        ------------------------------今天，用来对比是否不是今天
        select: JSON.parse(sessionStorage.days)[0],
//        自主入住隐藏两时间按钮
        byUserSelf: true,
//        -------------------------接待方式popup和picker
        popupReception: false,
        receptionSlots: [
          {
            values: ['自主入住', '接引客户'],
            className: 'receptionSlot',
            textAlign: 'center'
          }
        ],
        reception: '',
        saveReception: '',
//  ------------------------------接待时间popup和picker
        popupReceive: false,
        ReceiveSlots: [
          {
            values: JSON.parse(sessionStorage.days),
            defaultIndex: 0,
            className: 'receiveSlots1',
            textAlign: 'left'
          },
          {
            values: JSON.parse(sessionStorage.todayTime),
            defaultIndex: 0,
            className: 'receiveSlots2',
            textAlign: 'right'
          }
        ],
        receive: '',
        saveReceive: '',
//      -------------------------------------------------------打扫时间的popup和picker
        clean: '',
        popupClean: false,
//        暂存数据，避免直接显示选好的时间
        saveClean: '',
        cleanSlots: [
          {
            values: JSON.parse(sessionStorage.days),
            defaultIndex: 0,
            className: 'receiveSlots1',
            textAlign: 'left'
          },
          {
            values: JSON.parse(sessionStorage.todayTime),
            defaultIndex: 0,
            className: 'receiveSlots2',
            textAlign: 'right'
          }
        ]
      }
    }
  }
</script>
<style scoped>
  a {
    font-size: 0;
  }
  .mint-header{
    background: #74a92e!important;
  }
  #pushOrderBefore{
    width: 100vw;
    height: 100vh;
    background: #eee;
  }
  .pushInfo{
    margin-top: 10px;
    margin-bottom: 10px;
    background: #fff;
  }
  .pushInfo span{
    font-size: 13px;
    color: #000;
  }
  .pushInfo .guest{
    border: none;
    outline: none;
    text-align: right;
    width: 120px;
    font-size: 15px;
    color: #000;
  }
  .serviceCharge{
    font-size: 0;
    width: 100%;
    padding: 20px 10px;
    box-sizing: border-box;
    background: #fff;
  }
  .serviceCharge img{
    width: 20px;
    height: 24px;
    vertical-align: middle;
  }
  .serviceCharge .serviceLeft,.serviceRight{
    width: 50%;
    vertical-align: top;
    display: inline-block;
  }
  .serviceLeft span{
    color: #8c8c8c;
    font-size: 15px;
    padding-left: 14px;
    vertical-align: middle;
  }
  .serviceRight{
    font-size: 15px;
    text-align: right;
  }
  .serviceRight span{
    vertical-align: middle;
  }
  .serviceRight .vipPrice{
    font-size: 12px;
    color: #fd805b;
  }
  .serviceRight .joinVip{
    border: 1px solid #fd805b;
    padding: 1px 2px;
    border-radius: 2px;
    font-size: 15px;
    color: #fd805b;
    display: inline-block;
    margin-top: 2px;
  }
  .pushOrder{
    background: #eee;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #d9d9d9;
    font-size: 0;
    width: 100%;
    height: 50px;
  }
  .pushOrder div{
    width: 60%;
    height: 100%;
    line-height: 50px;
    padding-left: 10px;
    box-sizing: border-box;
    font-size: 15px;
    color: #fd805b;
    display: inline-block;
  }
  .pushOrder .btn{
    width: 40%;
    height: 100%;
    background: #74a92e;
    color: #fff;
    font-size: 15px;
    border: none;
    outline: none;
    text-align: center;
  }
  .pickerTitle{
    width: 100vw;
    font-size: 0;
    padding: 10px 0;
    border-bottom: 1px solid #d9d9d9;
  }
  .pickerTitle div{
    display: inline-block;
    width: 50%;
    font-size: 15px;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .vipGoods{
    width: 100%;
    background: #fff;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 14px 10px;
    box-sizing: border-box;
  }
  .vipGoods img, .vipGoods div{
    vertical-align: middle;
    display: inline-block;
  }
  .vipGoods span{
    vertical-align: text-bottom;
  }
  .vipGoods .vipGoodsTitle{
    color: #8c8c8c;
    font-size: 15px;
    padding-left: 10px;
  }
  .vipGoods .vipGoodsTitle span{
    color: #bbbbbb;
    font-size: 12px;
  }
  .showVipGoods{
    background: #fff;
    margin-bottom: 10px;
    font-size: 13px;
    padding-left: 10px;
  }
  .showVipGoods table{
    border-collapse: collapse;
  }
  .showVipGoods table tr{
    border-top: 1px solid #d9d9d9;
  }
  .showVipGoods table td{
    width: 20%;
    padding: 8px;
  }

</style>
<style>
  .pushInfo .mint-cell-title span{
    color: #8c8c8c;
    font-size: 15px;
    padding-left: 10px;
  }
  .receptionSlot{
    width: 100%;
  }
</style>
