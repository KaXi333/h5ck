<template>
    <b-container class="bv-example-row">
      <b-row align-v = "center" class="header-box">
          <b-col sm="3">
            <b-img @click="toHmoe" class="" :src = "require('../../common/images/Farm.png')" fluid /> 
          </b-col>
          <b-col sm="4" class="topHeaderFMCBox">
            <b-row class="topHeaderFMC">
                <b-img class="header-img" :src = "require('../../common/images/logo.png')" />
                <span class="FMCNum">{{$store.state.FMCValue}}</span>
                <span class="FMCText">FMC</span>
            </b-row>
          </b-col>
          <b-col sm="4" class="searchConBox">
            <img @click="searchFn" class="searchBtnCss" src="../../common/images/search.png">
            <b-form-input class="searchBox" v-model="searchKeyword"></b-form-input>
          </b-col>
          <b-col @click="goPaurse" class="sigInUp text-right padd_0" sm="1">
            <b-row class="">
              <b-img class="header-img" :src = "require('../../common/images/pause.png')" />
              <span class="pauseText">钱包</span> 
            </b-row>
          </b-col>
      </b-row>
    </b-container>
</template>

<script>
import store from '@/vuex/store'
export default {
  data () {
    return {
      searchKeyword:''
    }
  },
  mounted () {
  },
  computed:{
  },
  methods:{
    toHmoe(){
      this.$router.push('/');
    },
    //退出登录
    loginOutFn(){
      this.$store.commit('removetoken');//清楚token
      this.$store.commit('removeMerchant');//清除isMerchant
      this.$router.push('/sign_in');
    },
    //进入钱包
    goPaurse(){
      this.$router.push('/exchange/paurse');
    },
    //搜索页面
    searchFn(){
      this.$root.$emit('searchBtn',this.searchKeyword);
      this.$router.push({
        path:'/exchange/search',
        query:{
          searchKeyword:this.searchKeyword
        }
      });
      // this.$router.push('/exchange/search');
    }
  }
}
</script>

<style scoped>
*{
  font-style: normal;
}
*, *::before, *::after {
      box-sizing: border-box !important;
  }
.header-box{
  padding:10px 0;
}

.topHeaderFMCBox{
  padding-left: 7%;
  padding-right: 0;
}
.topHeaderFMC{
  padding-right: 0;
}
.topHeaderFMC span{
  display: inline-block;
  line-height: 40px;
}
.header-img{
  display:block;
}
.FMCNum{
  padding:0;
  font-size: 24px;
  color:#ff9900;
  margin-left: 20px;
}
.FMCText{
  font-size: 18px;
  color: #1a1a1a;
  font-style: italic;
  margin-left: 12px;
  font-weight: bold;
}
.searchConBox{
  padding-left: 0;
}
.searchBox{
  border-radius: 30px;
  height:40px;
  padding-left: 40px;
  font-size: 18px;
}
.searchBtnCss{
  position: absolute;
  left:10px;
  top:0;
  bottom: 0;
  margin:auto;

}
.pauseText{
  margin-left: 10px;
  font-size: 18px;
  color: #1a1a1a;
  cursor: pointer;
}

 
</style>
