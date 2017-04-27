<template>
    <div id="walletRecharge">
      <mt-header title="余额充值">
        <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
      </mt-header>
    </div>
</template>
<script>
  export default{}
</script>

<style scoped>
  #walletRecharge{
    width: 100vw;
    min-height: 100vh;
    background: #fff;
  }
</style>
