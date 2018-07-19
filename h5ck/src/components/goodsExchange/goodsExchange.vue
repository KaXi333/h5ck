<template>
  <div style="padding-bottom:60px;">
    <div class="slide-box">
      <b-carousel id="carousel1"
                  style="text-shadow: 1px 1px 2px #333;"
                  controls
                  indicators
                  :interval="2000"
                  img-width="1024"
                  img-height="480"
                  v-model="slide"
                  @sliding-start="onSlideStart"
                  @sliding-end="onSlideEnd"
      >
        <b-carousel-slide :img-src="require('../../common/images/slideShow/banner1.png')">
        </b-carousel-slide>
        <b-carousel-slide :img-src="require('../../common/images/slideShow/banner2.png')">
        </b-carousel-slide>
        <b-carousel-slide :img-src="require('../../common/images/slideShow/banner3.png')">
        </b-carousel-slide> 
      </b-carousel>
    </div>
    <div>
      <b-container class="bv-example-row">
        <b-row>
          <b-col cols="12" class="showImg">
            <b-img :src = "require('../../common/images/advantage.png')" fluid />
          </b-col>
        </b-row>
      </b-container>
    </div>  
    <div>
      <b-container class="bv-example-row">
        <b-row>
          <b-col cols="12" class="wellGoods text-center">
            <span>精选推荐
              <p class="controlsClip controlsClip1"></p>
              <p class="controlsClip controlsClip2"></p>
            </span>
          </b-col> 
        </b-row> 
        <b-row>
          <b-col v-for="(item,index) in ListWell" :key="item.id" cols="6" sm="4" class="shop-bgbox">
            <b-row align-v = "center" class="shop-bc">
              <b-col cols="6" class="shop-box">
                <span>{{item.name}}</span>
                <p>{{item.description}}</p>
                <selection :selections="selectionsData[index]"></selection>
                <h3 class="exchangeBtnCs" @click="exchangeBtnFn(item.id)">兑换</h3>
              </b-col> 
              <b-col cols="6" class="shop-box" @click="goDetailFn(item.id)">
                <b-img class="header-img" :src = "item.thumb" fluid />
              </b-col> 
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="showImg-box">
      <b-container class="bv-example-row">
        <b-row>
          <b-col cols="6" class="showImg">
            <b-img :src = "require('../../common/images/ad1.png')" fluid />
          </b-col>
          <b-col cols="6" class="showImg">
            <b-img :src = "require('../../common/images/ad2.png')" fluid />
          </b-col>  
        </b-row>
      </b-container>  
    </div>
    <div class="">
      <div class="container bv-example-row" style="position:relative;">
        <h3 class="classBox">分类:</h3>
        <ul class="classList">
          <li class="classActive">不限分类</li>
          <li v-for="(item,index) in CategoryList" :key="item.id" @click="CategoryFn(item.id)">{{item.name}}</li>
          <!-- <li>服饰鞋包</li>
          <li>服饰鞋包</li>
          <li>家具用品</li>
          <li>家装家饰</li>
          <li>美容护理</li>
          <li>母婴用品</li>
          <li>3C数码</li>
          <li>运动/户外</li>
          <li>食品/保健</li>
          <li>玩乐/收藏</li>
          <li>游戏/话费</li>
          <li>汽车配件</li>
          <li>书籍音像</li>
          <li>珠宝/首饰</li> -->
        </ul>
      </div>
    </div>
    <div>
      <b-container class="bv-example-row" style="min-height:794px;">
        <b-row>
          <b-col cols="12" class="recommend text-left">
            <p></p>
            <span>热门商品</span>
          </b-col> 
        </b-row>
        <b-row style="position:relative;">
          <b-col v-for="(item,index) in HotGoodList" :key="item.id" cols="4" sm="3" class="storeName goodsListPadd">
            <div class="storeName-bc">
              <b-img @click="goDetailFn(item.id)" :src = "item.thumb" fluid />
              <p class="goodsName text-center">{{item.name}}</p>
              <div class="selectLengthBox">
                <selection class="selectLength" :selections="selectionsData2[index]"></selection>
                <h3 class="exchangeBtnCs exchangeLength" @click="exchangeBtnFn(item.id)">兑换</h3>
              </div>
            </div>
          </b-col>
          <div class="advantagImg"><b-img :src = "require('../../common/images/ad3.png')" fluid /></div>
        </b-row>
        <div class="checkMoreBox">
            <h4 v-show="isShowMoreBtn" class="checkMore" @click="checkMoreFn">查看更多</h4>
        </div>
      </b-container>
    </div>
    <div>
      <b-container class="bv-example-row">
        <b-row>
          <b-col cols="12" class="showImg">
            <b-img :src = "require('../../common/images/advantage.png')" fluid />
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div>
      <b-container class="bv-example-row">
        <b-row>
          <b-col cols="12" class="recommend text-left">
            <p></p>
            <span>最新商品</span>
          </b-col> 
        </b-row>
        <b-row style="position:relative;">
          <b-col v-for="(item,index) in NewGoodList" :key="item.id"  cols="4" sm="3" class="storeName">
            <div class="storeName-bc">
              <b-img @click="goDetailFn(item.id)" :src = "item.thumb" fluid />
              <p class="goodsName text-center">{{item.name}}</p>
              <div class="selectLengthBox">
                <selection class="selectLength" :selections="selectionsData1[index]"></selection>
                <h3 class="exchangeBtnCs exchangeLength" @click="exchangeBtnFn(item.id)">兑换</h3>
              </div>
            </div>
          </b-col>
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
      page:1,
      isShowMoreBtn:true,
      HotMoreList:'',
      ListWell:'',
      CategoryList:'',
      HotGoodList:'',
      NewGoodList:'',
      selectionsData:[],
      selectionsData1:[ ],
      selectionsData2:[ ]
    }
  },
  mounted(){
    this.getUserList();
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
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
          this.getListWell();
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
    // 获取商品列表-精品推荐
    getListWell() {
        this.$axios({
            method: 'post',
            url: '/Exchange/getList',
            data: {
              sort: 2,
              limit:6
            }
        }).then(res=>{
          console.log(res);
          this.HotGoodListFn();
          this.ListWell = res.data.data;
          for (let k = 0; k <this.ListWell.length; k++) {
            var selection=[{label:'FMC',value:1000,index:0}]
            selection[0].value=this.ListWell[k].price.fmc
            selection[0].index=k
            this.selectionsData.push(selection)
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
     // 获取热门商品
    HotGoodListFn() {
        this.$axios({
            method: 'post',
            url: '/Exchange/getList',
            data: {
              sort: 3,
              page:1
            }
        }).then(res=>{
          console.log(res);
          this.NewGoodListFn();
          this.HotGoodList = res.data.data;
          for (let k = 0; k <this.HotGoodList.length; k++) {
            var selection=[{label:'FMC',value:1000,index:0}]
            selection[0].value=this.HotGoodList[k].price.fmc
            selection[0].index=k
            this.selectionsData2.push(selection)
          }
          if(this.HotGoodList.length<res.data.count){
            this.isShowMoreBtn=true
          }else{
            this.isShowMoreBtn=false
          }
        })
        .catch(err=>{
          console.log(err)
        })
    },
     // 获取最新商品
    NewGoodListFn() {
        this.$axios({
            method: 'post',
            url: '/Exchange/getList',
            data: {
              sort: 1,
              limit:8
            }
        }).then(res=>{
          console.log(res);
          this.NewGoodList = res.data.data;
          for (let k = 0; k <this.NewGoodList.length; k++) {
            var selection=[{label:'FMC',value:1000,index:0}]
            selection[0].value=this.NewGoodList[k].price.fmc
            selection[0].index=k
            this.selectionsData1.push(selection)
          }
        })
        .catch(err=>{
          console.log(err)
        })
    },
    //查看更多
    checkMoreFn(){
      this.page++
      this.$axios({
            method: 'post',
            url: '/Exchange/getList',
            data: {
              page:this.page,
              sort: 3,
            }
        }).then(res=>{
          console.log(res);
          this.HotMoreList = res.data.data;
          for (let k = 0; k <this.HotMoreList.length; k++) {
            this.HotGoodList.push(this.HotMoreList[k])
            var selection=[{label:'FMC',value:1000,index:0}]
            selection[0].value=this.HotMoreList[k].price.fmc
            selection[0].index=k
            this.selectionsData2.push(selection)
          }
          console.log(this.HotGoodList);
        })
        .catch(err=>{
          console.log(err)
        })
    },
    //选择分类
    CategoryFn(id){
      this.$root.$emit('searchBtn',id);
      this.$router.push({
        path:'/exchange/search',
        query:{
          searchId:id,
        }
      });
    }
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
    max-height:713px;
    overflow: hidden;
  }
  @media (max-width: 1199px) {
    .advantagImg{
      max-height:638px;
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
    border: 1px solid #9b2324;
    line-height: 30px;
    border-radius: 4px;
    margin:0 auto;
    font-size: 16px;
    color: #9b2324;
    cursor: pointer;
  }
</style>
