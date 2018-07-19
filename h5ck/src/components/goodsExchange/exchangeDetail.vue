<template>
  <div class="signUp-wrapper" style="padding-top:0;">
    <b-container class="sign-box">
      <h3 class="pauseTit">
        <span class="goHomeCss"><router-link to="/exchange">首页 > </router-link></span>
        <span>商品详情</span>
      </h3>
      <b-row align-h = "center" class="shopde-box">
        <b-col cols="3" class="" style="padding-right:25px;">
          <b-img class="shopImg" :src = "goodsDeatilData.thumb" fluid />
          <selection :selections="selections"></selection>
          <h3 class="exchangeBtnCs" @click="exchangeBtnFn(goodsId)">兑换</h3>
        </b-col> 
        <b-col cols="9" class="text-left shopConten">
          <h3>{{goodsDeatilData.name}}</h3>
          <p>{{goodsDeatilData.description}}</p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import selection from '@/components/base/selection'
export default {
  components: {
     selection
  },
  data () {
    return {
      goodsId:'',
      goodsDeatilData:'',
      selections:[
        {
          label:'FMC',
          value:1000,
          index:0
        }
      ]
    }
  },
  created() {
    this.getParams ();
    this.goodsDeatilFn(this.goodsId);
    this.getUserList();
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  },
  methods: {
    // 路由传参数
    getParams () {
      // 取到路由带过来的参数 
      this.goodsId = this.$route.query.id
    },
    // 获取商品详情
    goodsDeatilFn(id){
      this.$axios({
            method: 'post',
            url: '/Exchange/info',
            data: {
              id:id
            }
        }).then(res=>{
          console.log(res);
          this.goodsDeatilData=res.data.data
          this.selections[0].value=this.goodsDeatilData.price.fmc
        })
        .catch(err=>{
          console.log(err)
        })
    },
    // 兑换
    exchangeBtnFn(id){
      this.$axios({
            method: 'post',
            url: '/Exchange/exchange',
            data: {
              id:id,
              type:1,
              token: this.$store.state.token,
            }
        }).then(res=>{
          console.log(res);
          if(res.data.code === 0){
            this.getUserList();
            alert('兑换成功')
          }else if(res.data.code === 101){
            alert('兑换码不足')
          }
        })
        .catch(err=>{
          console.log(err)
        })
    },
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
 .sign-box{
  margin-top: 50px;
 }
  .shopde-box{
    padding: 50px 20px 60px 20px;
  }
  .shopImg{
    width: 100%;
    margin-bottom: 36px;
  }
  *, *::before, *::after {
      box-sizing: border-box !important;
  }

</style>
