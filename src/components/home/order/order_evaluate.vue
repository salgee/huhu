<template>
  <div id="evaluate">
    <mt-header title="发表评价">
      <mt-button icon="back" slot="left" @click="clearAdData"></mt-button>
    </mt-header>
    <div class="evaluateTitle">
      <div class="headImg"><img :src="avatar"></div>
      <div class="titleText">
        <div class="nameStar">
          <div class="name">{{name}}</div>
          <div class="star"><img src="../../../assets/images/五角星-拷贝-5@2x.png" v-for="n of starLevel"></div>
        </div>
        <div>拒单率：{{rejectRate}}%</div>
        <div>服务次数：{{serviceTimes}}次</div>
      </div>
    </div>
    <div class="evaluateContent">
      <div style="font-size: 16px">评论：</div>
      <div class="pushImg">
        <div class="preview"></div>
        <span>发照片</span>
      </div>
      <div class="score">
        <span>管家评分：</span>
        <img src="../../../assets/images/管家评分星星未填充@2x.png" v-for="n of 5">
      </div>
      <div class="remarks">
        <span>备&#12288;&#12288;注：</span>
        <textarea rows="7 " placeholder="三星以下请务必告知我们原因"></textarea>
      </div>
    </div>
    <mt-button size="large" class="pushEvaluate" @click="pushEvaluate">发表评论</mt-button>
  </div>
</template>
<script>
  import Axios from 'axios'
  export default{
    mounted: function () {
      this.avatar = sessionStorage.evaluateUseAvatar
      this.name = sessionStorage.evaluateUseName
      this.rejectRate = sessionStorage.evaluateUseRejectRate
      this.serviceTimes = sessionStorage.evaluateUseServiceTimes
      this.starLevel.length = sessionStorage.evaluateUseStarLevel
    },
    data () {
      return {
        avatar: '',
        name: '',
        rejectRate: '',
        serviceTimes: '',
        starLevel: []
      }
    },
    methods: {
      clearAdData () {
        let vm = this
        Promise.resolve(
          sessionStorage.clear()
        ).then(
          () => {
            vm.$router.go(-1)
          }
        )
      },
      pushEvaluate () {
        let that = this
        Axios.post('http://a.com/api/comment/add', {
          headers: {
            'Content-Type': 'application/json',
            'x-api-token': localStorage.token
          }
        })
          .then(function (data) {
            console.log(data)
          })
          .catch(function () {
            that.$toast({
              message: '订单信息错误，请稍后重试',
              position: 'bottom',
              duration: 2000
            })
          })
      }
    }
  }
</script>
<style scoped>
  #evaluate{
    width: 100vw;
    min-height: 100vh;
    position: relative;
  }
  .evaluateTitle{
    padding: 10px;
    background: url("../../../assets/images/发表评价背景@2x.png") no-repeat;
    background-size: cover;
    display: flex;
    margin: 15px 10px;
    margin-bottom: 5px;
    align-items:center;
  }
  .evaluateTitle .headImg{
    display: inline-block;
    background: url("../../../assets/images/发表评价头像框@2x.png") no-repeat center;
    background-size: contain;
    margin-right: 10px;
    padding: 2px;
    width: 35px;
    height:35px;
    border-radius: 45px;
  }
  .evaluateTitle .headImg img{
    width: 35px;
    height:35px;
    border-radius: 45px;
  }
  .evaluateTitle .titleText{
    flex: 9 ;
    display: inline-flex;
  }
  .evaluateTitle .titleText div{
    flex: 1;
    font-size: 12px;
    white-space: nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
  }
  .evaluateTitle .titleText .nameStar .star img{
    font-size: 0;
    width: 13px;
    height: 13px;
    vertical-align: bottom;
  }
  .evaluateContent{
    margin: 0 10px;
    padding: 10px;
    background: #f2f2f2;
    font-size: 15px;
  }
  .pushImg{
    margin:15px 0;
    display: flex;
    align-items: center;
  }
  .pushImg .preview{
    display: inline-block;
    background: url("../../../assets/images/相机@2x.png") no-repeat center;
    background-size: 30px;
    border: 1px solid #d6d6d6;
    width: 60px;
    height:60px;
  }
  .pushImg span{
    margin-left: 10px;
    font-size: 14px;
    color: #898989;

  }
  .score{
    display: flex;
    align-items: center;
  }
  .score span{
    flex-basis: 75px;
    margin-right: 10px;
  }
  .score img{
    width: 18px;
    height: 18px;
    padding: 0 2px;
  }
  .remarks{
    display: flex;
    align-items: flex-start;
    margin: 15px 0;
  }
  .remarks span{
    flex-basis: 75px;
    margin-right: 10px;
  }
  .remarks textarea{
    font-size: 12px;
    flex: 1;
    padding: 10px;
    background: #fff;
    border-radius: 15px;
    border: none;
    resize: none;
    outline: none;
  }
  .pushEvaluate {
    position: absolute;
    bottom: 30px;
    right: 0;
    left: 0;
    margin: auto;
    width: 80%;
    text-align: center;
    color: #fff;
    background-color: #79ac36;
    box-shadow: 0 4px 0 -1px #ddd;
  }
</style>
