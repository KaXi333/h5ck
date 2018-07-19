<template>
  <div>
    <div class="signUp-wrapper">
      <div class="sign-box container" style="padding:0;">
        <h3 class="pauseTit">
          <span class="goHomeCss"><router-link to="/exchange">首页 > </router-link></span>
          <span>我的钱包</span>
        </h3>
        <div class="FMCPause">
          <img src="../../common/images/logo.png">
          <span>FMC</span>
        </div>
        <div class="FMCValue">
          <span>{{$store.state.FMCValue}}</span>
          <em>FMC</em>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import store from '@/vuex/store'
export default {
  data () {
    return {
      
    }
  },
  mounted(){
    this.getUserList()
  },
  methods: {
    // 获取用户基本信息
    getUserList() {
        this.$axios({
            method: 'post',
            url: '/Member/info',
            data: {
              token: this.$store.state.token,
            }
        }).then(res=>{
          console.log(res);
          this.$store.state.FMCValue = res.data.data.fmc_balance;
        })
        .catch(err=>{
          console.log(err)
        })
    },
  }
}
</script>

<style scoped>
*, *::before, *::after {
      box-sizing: border-box !important;
  }

  *{
    font-style: italic;
  }
  .signUp-wrapper{
    padding-top: 0;
  }
  .pauseTit{
    padding:24px 0 15px 50px;
    border-bottom: 1px solid #f0f0f0;
    font-size: 18px;
  }
  .goHomeCss a{
    color: #999;
  }
  .FMCPause{
    padding-left:50px;
    position: relative;
    margin:30px 0 20px 0;
  }
  .FMCPause img{
    width:23px;
    height:23px;
    position: absolute;
    top:0;
    bottom:0;
    margin:auto; 
  }
  .FMCPause span{
    font-size: 26px;
    margin-left: 30px;
    font-weight: bold;
  }
  .FMCValue{
    height:50px;
    background-color: #f0f0f0;
    line-height: 50px;
    margin:0 50px;
    padding-left: 20px;
    position: relative;
    font-weight: bold;
    border-radius: 4px;
  }
  .FMCValue span{
    font-size: 24px;
    color: #ff9900;
  }
  .FMCValue em{
    position:absolute;
    right:20px;
    color: #999;
    font-size: 18px;
  }
</style>
