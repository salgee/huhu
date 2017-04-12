<template>
    <div id="joinVip">
      <mt-header title="VIP特权">
          <mt-button icon="back" slot="left" @click="goHome"></mt-button>
      </mt-header>
      <div class="vipContent">
        <img src="../assets/images/viplogo@2x.png" class="bigVip">
        <div class="vipTitle">超级会员专享特权</div>
        <div class="topThree">
          <div><img src="../assets/images/免费布草@2x.png" class="whereIco"><span class="icoName">免费布草</span><span class="icoInfo">根据房型享用一定数量专业级酒店布草</span></div>
          <div><img src="../assets/images/专属客服@2x.png" class="whereIco"><span class="icoName">专属客服</span><span class="icoInfo">一对一贴心服务省时省力</span></div>
          <div><img src="../assets/images/专业清洁用品@2x.png" class="whereIco"><span class="icoName">专业清洁用品</span><span class="icoInfo">所使用的清洁用品均为酒店专用</span></div>
        </div>
        <div class="bottomOne">
          <div><img src="../assets/images/呼呼学堂@2x.png" class="whereIco"><span class="icoName">呼呼学堂</span><span class="icoInfo">邀请参与民宿运营讲座</span></div>
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
    padding: 25px;
  }
  .vipContent .bigVip{
    width: 75px;
    height: 75px;
    margin-bottom: 15px;
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
  }
  .topThree div{
    display: inline-block;
  }
  .whereIco{
    width: 28px;
    height: 28px;

  }
  .icoName,.icoInfo{
    display: block;
  }
  .icoName{
    
  }
</style>
