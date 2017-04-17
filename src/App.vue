<template>
  <div id="huhu">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

<style>
body{
  margin: 0;
  background: #fafafa;
}
#huhu {
  width: 100vw;
  height: 100vh;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a{
  text-decoration: none;
  color: #000;
}
.slide-left-enter-active {
  position: absolute;
  top: 0;
  z-index: 100;
  background-color: #fff;
  transition: transform .3s linear;
}
.slide-left-leave-active {
  position: absolute;
  top: 0;
  z-index: 99;
  transform: translateX(-10%);
  transition: transform .3s ease-in;
}
.slide-left-enter {
  position: absolute;
  z-index: 100;
  background-color: #fff;
  transform: translateX(100%);
}
.slide-left-leave {
  position: absolute;
  z-index: 99;
  transform: translateX(0);
}
.slide-right-enter-active {
  position: absolute;
  z-index: 99;
  transition: transform .3s linear;
}
.slide-right-leave-active {
  position: absolute;
  z-index: 100;
  background-color: #fff;
  transform: translateX(100%);
  transition: transform .3s ease-in;
}
.slide-right-enter {
  position: absolute;
  z-index: 99;
  transform: translateX(-10%);
}
.slide-right-leave {
  position: absolute;
  z-index: 100;
  background-color: #fff;
  transform: translateX(0);
}
</style>
