<template>
  <div id="app">
    <top-navbar v-if="$store.state.showTopNav"></top-navbar>
      <router-view/>
  </div>
</template>

<script>
import TopNavbar from '@/components/topNavbar'
import BottomInfo from '@/components/bottomInfo'

export default {
  name: 'App',
  components: {
    'top-navbar': TopNavbar,
    'bottom-info': BottomInfo
  }
}
</script>

<style>
#app {
  font-family: "微软雅黑";
  /*-webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;*/
}
html{
  font-size: 12px;
  font-style: italic ;
}
a{
  text-decoration:none;
}
</style>
