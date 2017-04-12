<template>
    <div id="joinVip">
      <mt-header title="VIP特权">
          <mt-button icon="back" slot="left" @click="goHome"></mt-button>
      </mt-header>
      <div class="vipContent">
        <img src="../assets/images/viplogo@2x.png" class="bigVip">
        <div class="vipTitle">超级会员专享特权</div>
        <div class="topThree">
          <div><img src="../assets/images/免费布草@2x.png" class="whereIco"><span class="icoName">免费布草</span><span class="icoInfo">根据房型享用一定数量专业酒店布草</span></div>
          <div style="margin: 0 5%"><img src="../assets/images/专属客服@2x.png" class="whereIco"><span class="icoName">专属客服</span><span class="icoInfo">一对一贴心服务省时省力</span></div>
          <div><img src="../assets/images/专业清洁用品@2x.png" class="whereIco"><span class="icoName">专业清洁用品</span><span class="icoInfo">所使用的清洁用品均为酒店专用</span></div>
        </div>
        <div class="bottomOne">
          <div><img src="../assets/images/呼呼学堂@2x.png" class="whereIco"><span class="icoName">呼呼学堂</span><span class="icoInfo">邀请参与民宿运营讲座</span></div>
        </div>
      </div>
      <div class="joinVipBtn">
        <mt-button size="large">签订协议</mt-button>
        <div style="padding-top: 8px;position: relative;">
          <input type="checkbox" id="agree">
          <label for="agree"></label>
          <div class="vipAgree">
            <span>我已同意</span>
            <router-link tag="a" to="/user/joinVip/vipAgreement">《VIP服务协议》</router-link>
            <div>首次加入VIP30日内不能取消</div>
          </div>

        </div>
      </div>
    </div>
</template>
<script>
  import Axios from 'axios'
  Axios.defaults.baseURL = 'http://a.com'
  export default{
    methods: {
      goHome: function () {
        this.$messagebox.confirm('确定放弃吗?', '')
          .then(action => {
            this.$router.push('/')
          })
      },
      login: function () {
//      let that = this
        Axios.post('/api/customer/login', {
          account: '18149106608',
          password: 'a123456',
          customerType: 'landlord'
        },
          {
            headers: {'Content-Type': 'application/json'}
          }).then(function (data) {
            if (data.status === 200) {
              localStorage.whyccupToken = data.data.data.token
            }
            console.log(data)
          })
      }
    },
    mounted: function () {
      this.login()
    }
  }
</script>
<style scoped>
  .mint-header{
    background: #74a92e!important;
  }
  .vipContent{
    text-align: center;
    padding: 20px 15px;
  }
  .vipContent .bigVip{
    width: 65px;
    height: 65px;
  }
  .vipTitle{
    width: 100%;
    height:55px;
    line-height: 55px;
    color: #aecd43;
    background:url('../assets/images/超级会员专享特权框@2x.png') no-repeat center;
    background-size: contain;
    font-size: 15px;
    margin-bottom: 15px;
  }
  .topThree,.bottomOne{
    width: 100%;
    font-size: 0;
  }
  .bottomOne{
    padding-top: 20px;
  }
  .topThree div{
    display: inline-block;
    width: 30%;
    vertical-align: top;
  }
  .whereIco{
    width: 28px;
    height: 28px;

  }
  .icoName,.icoInfo{
    display: block;
    color:#8c8c8c;
  }
  .icoName{
    font-size: 14px;
    padding-top: 10px;
  }
  .icoInfo{
    padding-top: 8px;
    font-size: 12px;
    color: rgba(140, 140, 140, 0.5);
  }
  .joinVipBtn{
    width: 70%;
    margin: 0 auto;
    text-align: center;
    padding-top: 15px;
  }
  .joinVipBtn button{
    background: #74a92e;
    color: #fff;
    font-size: 15px;
  }
  .joinVipBtn input{
    vertical-align: middle;
    margin: 0 15px;
    position: relative;
    outline: none;
    opacity: 0;
  }
  .joinVipBtn label:before{
    content: '';
    position:absolute;
    top: 45%;
    left: 10%;
    width: 12px;
    height: 12px;
    border: 1px solid rgba(140, 140, 140, 0.5);
    background: url("../assets/images/管家订单详情勾子@2x.png") no-repeat center;
    background-size: 0;
  }
  .joinVipBtn input:checked + label:before{
    transition: all 0.1s;
    background-size: 10px;
  }


  .joinVipBtn .vipAgree{
    display: inline-block;
    vertical-align: middle;
  }
  .vipAgree span{
    color: #8c8c8c;
    font-size: 14px;
  }
  .vipAgree a{
    color: #41addb;
    font-size: 14px;
    text-align: left;
  }
  .vipAgree div{
    color: rgba(140, 140, 140, 0.5);
    font-size: 12px;
    text-align: left;
  }
</style>
