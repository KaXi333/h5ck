<template>
  <div style="padding-bottom:60px;">
    <div>
      <b-container class="bv-example-row">
        <h3 class="pauseTit">
          <span class="goHomeCss"><router-link to="/exchange">首页 > </router-link></span>
          <span>搜索详情</span>
        </h3>
        <b-row>
          <b-col cols="12" class="showImg">
            <b-img :src = "require('../../common/images/advantage.png')" fluid />
          </b-col>
        </b-row>
      </b-container>
    </div> 
    <div class="" style="margin-top:20px;">
      <div class="container bv-example-row" style="position:relative;">
        <h3 class="classBox">分类:</h3>
        <ul class="classList">
          <li @click="allCategoryFn" :class="{classActive:isAllCategory}">不限分类</li>
          <li v-for="(item,index) in CategoryList" :key="item.id" :class="{classActive:item.id===searchId}" @click="CategoryFn(item.id)">{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div>
      <b-container class="bv-example-row" style="margin-top:20px;">
        <b-row style="position:relative;">
          <b-col v-for="(item,index) in searchData" :key="item.id" cols="4" sm="3" class="storeName">
            <div class="storeName-bc">
              <b-img @click="goDetailFn(item.id)" :src = "item.thumb" fluid />
              <p class="goodsName text-center">{{item.name}}</p>
              <div class="selectLengthBox">
                <selection class="selectLength" :selections="selections[index]"></selection>
                <h3 class="exchangeBtnCs exchangeLength" @click="exchangeBtnFn(item.id)">兑换</h3>
              </div>
            </div>
          </b-col>
          <b-col v-if="isNoGoods" class="text-center" style="min-height:300px;line-height:300px;font-size:36px;">无此商品</b-col>
        </b-row>
      </b-container>
    </div>  
  </div>  
</template>

<script>
import '../../common/stylus/goodsExchange.css'
import selection from '@/components/base/selection'
export default {
  components: {
     selection
  },
  data () {
    return {
      slide: 0,
      searchKeyword:'',
      searchData:'',
      selections:[],
      goodsId:'',
      searchId:'',
      CategoryList:'',
      isNoGoods:false,
      isAllCategory:false
    }
  },
  created(){
    this.getParams ();
    this.getParamsId();
    this.getUserList();
    //监听topNavbar组件的事件
    this.$root.$on('searchBtn', function(keyword) {
      this.searchKeyword=keyword
      console.log(this.searchKeyword);
    }.bind(this))
  },
  methods: {
    //去到详情页
    goDetailFn(){
      this.$router.push('/exchange/exchangeDetail');
    },
    getParams () {
      // 取到路由带过来的搜索关键词参数 
      this.searchKeyword = this.$route.query.searchKeyword
      console.log(this.searchKeyword)
    },
     getParamsId () {
      // 取到路由带过来的iD参数 
      this.searchId = this.$route.query.searchId
      console.log(this.searchId)
    },
    //去到详情页
    goDetailFn(id){
      this.$router.push({
        path:'/exchange/exchangeDetail',
        query:{
          id:id
        }
      });
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
    // 获取商品分类
    CategoryListFn() {
        this.$axios({
            method: 'post',
            url: '/Exchange/getCategory',
            data: {
              limit:20
            }
        }).then(res=>{
          console.log(res);
          this.CategoryList = res.data.data;
        })
        .catch(err=>{
          console.log(err)
        })
    },
    // 刷新加载
    getSearchAllData(){
      if(this.searchId){
          this.CategoryFn(this.searchId);
       }else{
          this.getSearchData();
       }
    },
    // 获取搜索数据
    getSearchData() {
        this.$axios({
            method: 'post',
            url: '/Exchange/getList',
            data: {
              name:this.searchKeyword
            }
        }).then(res=>{
          console.log(res,636300);
          this.searchData = res.data.data;
          if(this.searchData.length<1){
            this.isNoGoods=true
          }else{
            this.isNoGoods=false
          }
          this.selections=[]
           for (let k = 0; k <this.searchData.length; k++) {
            var selection=[{label:'FMC',value:1000,index:0}]
            selection[0].value=this.searchData[k].price.fmc
            selection[0].index=k
            this.selections.push(selection)
            console.log(333)
          }
          console.log(this.selections);
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
          this.CategoryListFn();
          this.getSearchAllData();
        })
        .catch(err=>{
          console.log(err)
        })
    },
    //选择分类
    CategoryFn(id){
      this.isAllCategory=false,
      this.searchId=id,
      this.$axios({
            method: 'post',
            url: '/Exchange/getList',
            data: {
              categoryId:this.searchId
            }
        }).then(res=>{
          console.log(res,6363);
          this.searchData = res.data.data;
          if(this.searchData.length<1){
            this.isNoGoods=true
          }else{
            this.isNoGoods=false
          }
          this.selections=[]
           for (let k = 0; k <this.searchData.length; k++) {
            var selection=[{label:'FMC',value:1000,index:0}]
            selection[0].value=this.searchData[k].price.fmc
            selection[0].index=k
            this.selections.push(selection)
          }
          console.log(this.selections);
        })
    },
    //不限分类
    allCategoryFn(){
      this.searchId='',
      this.searchKeyword='',
      this.isAllCategory=true,
      this.getSearchData();
    }
  },
  // 在组件销毁时解除事件绑定
  beforeDestroy() {
    this.$root.$off('searchBtn')
  }
}
</script>

<style scoped>
*, *::before, *::after {
      box-sizing: border-box !important;
  }
  .carousel-indicators li{
    width: 8px;
    height:8px;
    border-radius: 5px;
  }
  .shop-bgbox{
    padding-right: 0;
    margin-bottom: 15px;
  }
  .shop-bc{
    background-color: #f9f9f9;
    margin:0;
    padding: 18px 10px;
    min-height: 139px;
  }
  .shop-box {
    text-align: left;
    padding: 8px;
  }
  .shop-box span{
    font-size: 18px;
    color:#1b1b1b;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .shop-box p{
    color:#808080;
    font-size: 14px;
    margin: 0;
    margin-top: 10px;
    margin-bottom: 10px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .showImg-box{
    margin-top:20px; 
    margin-bottom:35px;
  }
  .showImg{
    padding-right: 0;
  }

 /*精选推荐样式*/
  .wellGoods{
    font-size: 24px;
    color: #1b1b1b;
    padding: 26px;
    font-weight: bold;
  }
  .wellGoods span{
    position: relative;
  }
  .controlsClip{
    position: absolute;
    width: 8px;
    height:8px;
    border-radius: 50%;
    top:0;
    bottom:0;
    margin:auto;
    background-color: #9b2324;
  }
  .controlsClip1{
    left:-20px;
  }
  .controlsClip2{
    right:-20px;
  }
  .controlsClip3{
    right:-44px;
  }
  
  /*分类样式*/
  .classBox{
    position: absolute;
    left:15px;
    top:0;
    height: 30px;
    line-height: 30px;
  }
  .classList{
    overflow:hidden;
    padding-left: 60px;
    padding-bottom: 20px;
    margin-bottom: 0;
    border-bottom: 1px solid #f2f2f2;
  }
  .classList li{
    float: left;
    height:30px;
    padding:0 10px;
    line-height: 30px;
    text-align: center;
    margin-left: 10px;
    cursor: pointer;
  }
  .classActive{
    color: #fff;
    background-color: #9b2324;
    border-radius: 4px;
  }
  
  .selectLengthBox{
    height:30px;
  }
  .selectLength{
    float: left;
    width: 62%;
  }
  .exchangeLength{
    float: right;
    width: 32%;
    margin-top:0;
  }
  .goodsListPadd:nth-child(1){
    margin-left:25%;
  }
  .goodsListPadd:nth-child(4){
    margin-left:25%;
  }
  .advantagImg{
    position: absolute;
    width:25%;
    padding-left: 15px;
    max-height:644.94px;
    overflow: hidden;
  }
  @media (max-width: 1199px) {
    .advantagImg{
      max-height:567.68px;
      overflow: hidden;
    }
  }
  .checkMoreBox{
    padding-left: 15px;
    padding-top: 10px;
    padding-bottom: 25px;
  }
  .checkMoreBox h4{
    text-align:center;
    width: 100px;
    height:30px;
    border: 1px solid #ff9900;
    line-height: 30px;
    border-radius: 4px;
    margin:0 auto;
    font-size: 16px;
    color: #ff9900;
    cursor: pointer;
  }
  .pauseTit{
    border-top: 1px solid #f0f0f0;
    border-bottom: none;
  }
</style>
