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
        <div class="preview" @click="makeSheetVisible" v-if="this.dataUrl.length === 0"></div>
        <div class="previewElse" @click="makeSheetVisible" v-else>
          <img :src="imgUrl" id="previewImg" ref="preview"  @click.stop="makeSheetVisible" v-for="imgUrl of dataUrl">
        </div>
        <span>发照片</span>
        <input type="file" id="addImg" ref="file" v-show="false" @change="fileChange">
        <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
      </div>
      <div class="score">
        <span>管家评分：</span>
        <div style="position: relative;">
          <div style="position: absolute">
            <img src="../../../assets/images/管家评分星星未填充@2x.png" v-for="(n,index) of 5" @click.stop="getStar(index+1)" >
          </div>
          <div style="position: absolute;z-index:99;">
            <img src="../../../assets/images/五角星-拷贝-5@2x.png" v-for="(n,index) of postStarLevel" @click="getStar(index+1)" v-if="postStarLevel !== ''">
          </div>
        </div>
      </div>
      <div class="remarks">
        <span>备&#12288;&#12288;注：</span>
        <textarea rows="7 " placeholder="三星及以下请务必告知我们原因" v-model="comment"></textarea>
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
        starLevel: [],
        actions: [{
          name: '拍照',
          method: ''
        }, {
          name: '从相册选择',
          method: this.addImg
        }
        ],
//        承载图片64码
        dataUrl: [],
        sheetVisible: false,
//        几颗星星
        postStarLevel: '',
//        承载评论内容
        comment: ''
      }
    },
    methods: {
//      获得点的是第几颗星星
      getStar: function (index) {
        this.postStarLevel = index
      },
//      点击图片使mt下框弹出
      makeSheetVisible: function () {
        this.sheetVisible = true
      },
//      触发input[type=file]
      addImg: function () {
        this.$refs.file.click()
      },
//      当图片改变时，获得图片并转为64码
      fileChange: function () {
        let files = this.$refs.file.files[0]
        this.imgPreview(files)
      },
//      将图片转码并传回
      imgPreview (files) {
        let that = this
        if (/^image/.test(files.type)) {
          // 创建一个reader
          let reader = new FileReader()
          // 将图片将转成 base64 格式
          reader.readAsDataURL(files)
          // 读取成功后的回调
          reader.onloadend = function () {
            that.dataUrl.push(this.result)
          }
        } else {
          this.$toast('请不要上传其他文件')
        }
      },
//      离开页面之前清除多余数据
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
        if (this.dataUrl === '') {
          this.$toast({
            message: '请上传一张图片',
            position: 'bottom'
          })
        } else {
          if (this.postStarLevel === '') {
            this.$toast({
              message: '请给管家评分',
              position: 'bottom'
            })
          } else {
            if (this.postStarLevel <= 3 && this.comment === '') {
              this.$toast({
                message: '三分及以下请说明',
                position: 'bottom'
              })
            } else {
              let that = this
              Axios.post('http://a.com/api/comment/add', {
                orderId: sessionStorage.evaluateUseOrderId,
                housekeeperId: parseInt(sessionStorage.evaluateUseStarLevel),
                comment: that.comment,
                starLevel: that.postStarLevel,
                picList: that.dataUrl
              }, {
                headers: {
                  'Content-Type': 'application/json',
                  'x-api-token': localStorage.token
                }
              })
                .then(function (data) {
                  if (data.data.data === 'isOk') {
                    Promise.resolve((() => {
                      that.$toast({
                        message: '评价成功',
                        position: 'bottom',
                        duration: 2000
                      })
                    })()
                    )
                      .then(
                        this.$router.go(-1)
                      )
                  } else {
                    that.$toast({
                      message: data.data.message,
                      position: 'bottom',
                      duration: 2000
                    })
                  }
                })
                .catch(function () {
                  that.$toast({
                    message: '服务器错误，请稍后重试',
                    position: 'bottom',
                    duration: 2000
                  })
                })
            }
          }
        }
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
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .pushImg .preview{
    background: url("../../../assets/images/相机@2x.png") no-repeat center;
    background-size: 30px;
    border: 1px solid #d6d6d6;
    display: inline-flex;
    align-items: center;
    height:60px;
    width: 60px;
    margin: 15px 0;
  }
  .pushImg .previewElse{
    border: 1px solid #f2f2f2;
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 15px;
  }
  #previewImg{
    border: none;
    font-size: 0;
    margin-right: 10px;
    margin-bottom: 15px;
    height: 60px;
  }
  .pushImg span{
    margin: 5px 0;
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
  .score div{
    flex: 1;
    height: 18px;
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
