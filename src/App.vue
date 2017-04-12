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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a{
  text-decoration: none;
  color: #000;
}
.slide-left-enter-active {
  transition: all .5s linear;
}
.slide-left-leave-active {
  transform: translateX(-10%);
  transition: all .2s ease-in;
}
.slide-left-enter {
  transform: translateX(90%);
}
.slide-left-leave {
  transform: translateX(0);
}
.slide-right-enter-active {
  transition: all .8s linear;
}
.slide-right-leave-active {
  transform: translateX(90%);
  transition: all .5s ease-in;
}
.slide-right-enter {
  transform: translateX(-10%);
}
.slide-right-leave {
  transform: translateX(0);
}
</style>
