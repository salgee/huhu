<template>
  <div id="appendOrder">
    <h3>追加订单</h3>
    <div class="order-info" v-for="info in appendOrder">
      <p class="order-id">订单号：{{info.orderId}}</p>
      <p class="item" v-for="item in info.orderDetailList">
        <span>{{item.productName}}</span>X<span>{{item.quantity}}</span>
        <span class="price">&yen;&nbsp;{{item.itemAmount.toFixed(2)}}</span>
      </p>
    </div>
    <p v-if="show" class="total-price price">&yen;&nbsp;{{total.toFixed(2)}}</p>
  </div>
</template>

<script>
  export default {
    name: 'append_order',
    props: {
      appendOrder: {
        type: Array,
        required: true
      },
      show: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      total () {
        const arr = this.$props.appendOrder
        if (arr.length === 1) {
          console.log(1)
          return arr[0].totalAmount
        }
        return this.$props.appendOrder.reduce((x, y) => {
          return x.totalAmount + y.totalAmount
        })
      }
    }
  }
</script>

<style scoped>
 #appendOrder {
   font-size: 12px;
   margin: 0 30px;
   overflow: hidden;
 }
 #appendOrder  h3{
   font-size: 14px;
   margin: 0;
   padding: 8px 0;
   border-bottom: 1px solid #ededed;
 }
 #appendOrder .order-id {
   color: #bdbdbd;
   padding-bottom: 8px;
   border-top: 1px solid #ededed;
 }
 #appendOrder p {
   line-height: 20px;
 }
 #appendOrder .item {
   height: 30px;
 }
 #appendOrder .price {
   float: right;
   font-size: 18px;
 }
 #appendOrder .total-price {
   color: red;
 }
</style>
