<template>
    <div id="joinVip">
      <mt-header title="VIP特权">
          <mt-button icon="back" slot="left" @click="goHome"></mt-button>
      </mt-header>
      <div class="vipContent">
        <img src="../assets/images/viplogo@2x.png" class="bigVip">
        <div class="vipTitle">超级会员专属特权</div>
      </div>
    </div>
</template>
<script>
  export default{
    methods: {
      goHome: function () {
        this.$messagebox.confirm('确定放弃吗?', '')
          .then(action => {
            this.$router.push('/')
          })
      }
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
    margin-bottom: 25px;
  }
  .vipTitle{
    color: #aecd43;
    background: url('../assets/images/超级会员专享特权框@2x.png');
  }
</style>
