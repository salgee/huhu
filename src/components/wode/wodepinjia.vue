<template>
 <div class="wodepinjia">
   <mt-header title="我的评价">
     <router-link to="/" slot="left">
       <router-link tag="span" to="/user"><mt-button icon="back">返回</mt-button></router-link>
     </router-link>
   </mt-header>
 </div>
</template>
<script>
  export default {
    name: 'wodepinjia'
  }
</script>
<style>
  .wodepinjia{
    width:100wh;
    height:100vh;
  }
  .wodepinjia header{
    background-color:green;
  }
</style>
