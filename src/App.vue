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
  min-height: 100vh;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
p {
  margin: 0;
}
a{
  text-decoration: none;
  color: #000;
}
.slide-left-enter-active {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
  background-color: #fff;
  transition: transform .167s linear;
}
.slide-left-leave-active {
  position: relative;
  z-index: 99;
  transform: translateX(-10%);
  transition: transform .167s ease-in;
}
.slide-left-enter {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
  background-color: #fff;
  transform: translateX(100%);
}
.slide-left-leave {
  position: relative;
  z-index: 99;
  transform: translateX(0);
}
.slide-right-enter-active {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 99;
  transition: transform .167s linear;
}
.slide-right-leave-active {
  position: relative;
  z-index: 100;
  background-color: #fff;
  transform: translateX(100%);
  transition: transform .167s ease-in;
}
.slide-right-enter {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 99;
  transform: translateX(-10%);
}
.slide-right-leave {
  position: relative;
  z-index: 100;
  background-color: #fff;
  transform: translateX(0);
}
</style>
