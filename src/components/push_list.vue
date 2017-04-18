<template>
    <div id="pushList">
      <mt-header title="添加房源" style="background: #79ac36;">
        <mt-button icon="back" slot="left" @click="goBack"></mt-button>
      </mt-header>
    </div>
</template>
<script>
  export default{
    methods: {
      goBack: function () {
        window.history.go(-1)
      }
    }
  }
</script>
<style scoped>
  #pushList{
    width: 100vw;
    height: 100vh;
  }
</style>
