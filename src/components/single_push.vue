<template>
  <div id="singlePush">
    <mt-header title="填写信息">
      <mt-button icon="back" slot="left" @click="goHome"></mt-button>
    </mt-header>
  </div>
</template>
<script>
  export default{
    methods: {
      goHome: function () {
        this.$router.push('/')
      }
    }
  }
</script>
<style scoped>
  .mint-header{
    background: #74a92e!important;
  }
</style>
