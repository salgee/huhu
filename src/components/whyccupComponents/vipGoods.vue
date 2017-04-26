<template>
      <tr  class="vipGoods">
        <td style="width: 5%;border-bottom: 1px solid #ececec;"></td>
        <td style="width: 11%;border-bottom: 1px solid #ececec;"><input type="checkbox" v-model="select" @change="addOneOrNo"></td>
        <td style="width: 16%;border-bottom: 1px solid #ececec;">{{goodsName}}</td>
        <td style="width: 25%;border-bottom: 1px solid #ececec;">
          <div style="margin: 0 auto">
            <img src="../../assets/images/减号@2x.png" style="left: 0" @click="minus">
            {{goodsNum}}
            <img src="../../assets/images/加号@2x.png" style="right: 0" @click="add">
          </div>
        </td>
        <td style="width: 21%;border-bottom: 1px solid #ececec;">{{goodPrice}}</td>
        <td style="width: 17%;border-bottom: 1px solid #ececec;">{{goodDeposit}}</td>
        <td style="width: 5%;border-bottom: 1px solid #ececec;"></td>
      </tr>
</template>

<script>
  export default{
    props: ['goodsInfo'],
    data () {
      return {
        select: false,
        goodsName: this.goodsInfo.productName,
        goodsNum: 0,
        goodPrice: this.goodsInfo.price + '￥/' + this.goodsInfo.unit,
        goodDeposit: this.goodsInfo.foregift + '￥/' + this.goodsInfo.unit,
        productNo: this.goodsInfo.productNo
      }
    },
    methods: {
      addOneOrNo: function () {
        if (this.select === false) {
          this.goodsNum = 0
        } else if (this.select === true) {
          this.goodsNum = 1
        }
      },
      add: function () {
        if (this.select === false) {
          this.$toast({
            message: '请选择商品',
            position: 'bottom'
          })
        } else {
          this.goodsNum += 1
        }
      },
      minus: function () {
        if (this.select === false) {
          this.$toast({
            message: '请选择商品',
            position: 'bottom'
          })
        } else {
          if (this.goodsNum === 1) {
            this.$toast({
              message: '商品数量已经最少',
              position: 'bottom'
            })
          } else {
            this.goodsNum += -1
          }
        }
      }
    }
  }
</script>

<style scoped>
  td {
    padding: 15px 0;
  }
  .vipGoods td div{
    width: 88px;
    height: 22px;
    line-height: 22px;
    background: url("../../assets/images/加减号底色@2x.png") no-repeat center;
    background-size: contain;
    position: relative;
  }
  .vipGoods td div img{
    width:22px;
    height: 22px;
    position: absolute;
    top:0;
  }
</style>
