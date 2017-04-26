<template>
  <div id="pushOrderBeforeVipGoods">
    <mt-header title="额外服务">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
      <mt-button slot="right" @click="saveGoods">确定</mt-button>
    </mt-header>
    <div class="goods">
      <table>
        <tr>
          <td style="width: 5%"></td>
          <td style="width: 11%;border-bottom: 1px solid #f4f4f4;">选择</td>
          <td style="width: 16%;border-bottom: 1px solid #f4f4f4;">名称</td>
          <td style="width: 25%;border-bottom: 1px solid #f4f4f4;">数量</td>
          <td style="width: 21%;border-bottom: 1px solid #f4f4f4;">单价</td>
          <td style="width: 17%;border-bottom: 1px solid #f4f4f4;">押金</td>
          <td style="width: 5%"></td>
        </tr>
        <vipGoods v-for="goodsInfo in goodsInfos" key="goodsInfo.id" :goodsInfo="goodsInfo" ref="goods"></vipGoods>
      </table>
    </div>
  </div>
</template>

<style scoped>
  #pushOrderBeforeVipGoods{
    width: 100vw;
    height: 100vh;
    background: #eee;
    position: relative;
  }
  .goods{
    background: #fafafa;
    font-size: 15px;
    position: absolute;
    top: 50px;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .goods table{
    border-collapse: collapse;
    border-spacing: 0;
  }
  .goods table td {
    padding: 10px 0;
  }
</style>

<script>
  import vipGoods from './whyccupComponents/vipGoods.vue'
  import Axios from 'axios'
  Axios.defaults.baseURL = 'http://a.com'
  export default{
    data () {
      return {
        goodsInfos: []
      }
    },
    methods: {
      saveGoods: function () {
        let that = this
        Promise.resolve((() => {
          let goods = []
          for (let i = 0; i < that.$refs.goods.length; i++) {
            if (that.$refs.goods[i].select === true) {
              let saveData = {
                productNo: that.$refs.goods[i].productNo,
                productName: that.$refs.goods[i].goodsName,
                quantity: that.$refs.goods[i].goodsNum,
                price: Number(that.$refs.goods[i].goodsNum * that.$refs.goods[i].goodsInfo.price).toFixed(2),
                foregift: Number(that.$refs.goods[i].goodsNum * that.$refs.goods[i].goodsInfo.foregift).toFixed(2)
              }
              goods.push(saveData)
            }
          }
          sessionStorage.orderDetailList = JSON.stringify(goods)
        })()
        )
          .then(
            this.$router.go(-1)
          )
      },
      getGoods: function () {
        let that = this
        Axios.get('/api/manage/product/detail/query/' + sessionStorage.orderUseHouesProvince + '/' + sessionStorage.orderUseHouesCity
        ).then(function (data) {
          that.goodsInfos = data.data.data
        })
      }
    },
    mounted () {
      this.getGoods()
    },
    components: {
      vipGoods
    }
  }
</script>
