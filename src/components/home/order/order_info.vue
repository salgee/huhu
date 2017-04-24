<template>
  <div>

  </div>
</template>

<script>
  import Axios from 'axios'
  import {Header, Toast} from 'mint-ui'
  export default {
    name: 'app',
    mounted () {
      this.getOrderInfo(this.$route.params.orderId)
    },
    methods: {
      getOrderInfo (id) {
        Axios('http://a.com/api/order/findOrder/' + id)
          .then(function (data) {
            console.log(data)
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    },
    components: {
      mtHeader: Header,
      Toast
    }
  }

</script>

<style>

</style>
