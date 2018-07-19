<template>
  <div>
    <header-nav></header-nav>
      <router-view/>
    <bottom-info></bottom-info>
  </div>
</template>

<script>
import goodsHeaderNav from '@/components/goodsExchange/goodsHeaderNav'
import BottomInfo from '@/components/bottomInfo'

export default {
  components: {
    'header-nav': goodsHeaderNav,
    'bottom-info': BottomInfo
  },
  created(){
    this.$store.state.showTopNav = false
  },
}
</script>

<style>
    *{
    font-style: normal;
  }
</style>
