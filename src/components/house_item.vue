<template>
    <div id="houseOne">
      <div class="houseItem">
        <img src="../assets/images/vip灰色@2x.png" class="vipImg" v-if="true" @click="joinVip">
        <img src="../assets/images/vip标识@2x.png" class="vipImg" v-else>
        <div class="houseAddress">
          <img src="../assets/images/地址@2x.png" class="addressImg">
          <span>{{houseCity}}</span><span>{{houseAddress}}</span>
        </div>
        <div class="houseInfo">
          <span>{{houseBig}}&nbsp;居室&nbsp;/</span>
          <span>{{houseBed}}&nbsp;张床&nbsp;/</span>
          <span>{{houseHowEnter}}</span>
        </div>
        <div class="houseBtn">
          <button class="oneClick" v-if="true" @click="singlePush">一键下单</button>
          <button class="oneClick" v-else>一键上架</button>
          <button class="joinVIP" v-if="true" @click="joinVip">加入VIP</button>
        </div>
      </div>
    </div>
</template>
<script>
  import Axios from 'axios'
  Axios.defaults.baseURL = 'http://139.224.238.161:9999'
  export default{
    data () {
      return {
        houseCity: '房子在的城市',
        houseAddress: '房子在的详细地址',
        houseBig: '2',
        houseBed: '4',
        houseHowEnter: '怎么进入'
      }
    },
    methods: {
      login: function () {
//      let that = this
        Axios.post('/api/customer/login', {
          account: '18149106608',
          password: 'a123456',
          customerType: 'landlord'
        }).then(function (data) {
          if (data.data.user.status === 'normal') {
            localStorage.whyccupToken = data.data.token
          }
        })
      },
      singlePush: function () {
        this.$router.push('singlePush')
      },
      joinVip: function () {
        this.$router.push('joinVip')
      }
    },
    mounted: function () {
      this.login()
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
    border: 1px solid #edf3e6;
    padding: 20px 0px;
    padding-top: 30px;
    padding-left: 20px;
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
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    transform:rotate(-4deg) scale(1.018,0.94);
  }
  .houseAddress{
    font-size: 15px;
    margin-bottom: 15px;
    position: relative;
  }
  .addressImg{
    width: 12px;
    height: 16px;
    position: absolute;
    top:2px;
    left:-14px;
  }
  .houseInfo{
    margin-bottom: 25px;
  }
  .houseInfo span{
    font-size: 12px;
    margin-right: 2px;
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
