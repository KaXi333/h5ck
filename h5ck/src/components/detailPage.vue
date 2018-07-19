<template>
  <div class="detailPageBox">
    <div class="navBarBox">
      <ul class="navBarList" :class="{controllActive:0===nowIndex}">
        <div class="bjys"></div>
        <img src="../common/images/jxbj.png">
        <li @click="chooseDetailFn(index)" v-for="(item,index) in detailPagesData" :key="item.id" :class="{chooseActive:index===nowIndex}">{{item}}</li>
      </ul>
    </div>
    <div class="detailPage">
      <img class="editImg1" src="../common/images/editImg1.png">
      <div class="detailPageList" v-if="0===nowIndex">
        
      </div>
       <div class="detailPageList" v-if="1===nowIndex">
        
      </div>
       <div class="detailPageList" v-if="2===nowIndex">
        
      </div>
       <div class="detailPageList" v-if="3===nowIndex">

      </div>
       <div class="detailPageList" v-if="4===nowIndex">
       
      </div>
       <div class="detailPageList" v-if="5===nowIndex">
        
      </div>
       <div class="detailPageList" v-if="6===nowIndex">
        
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/store'
export default {
  data () {
    return {
      nowIndex:0,
      detailPagesData:[
        '创建小号',
        '获得小猪',
        '基因遗传',
        '交配事项',
        '农场主等级',
        '场景介绍',
        '养殖种类'
      ]
    }
  },
  created() {
    this.$store.state.isSteps = true
    this.getParams ()
   //监听状态
    this.$root.$on('nowIndexeFn', function(nowIndex) {
      this.nowIndex=nowIndex
    }.bind(this))
    this.chooseDetailFn(this.nowIndex)
  },
  methods: {
    chooseDetailFn(index){
      this.$root.$emit('nowIndexeFn',index);
    },
    // 路由传参数
    getParams () {
      // 取到路由带过来的参数 
      this.nowIndex = this.$route.query.index;
      
    },
  },
  // 在组件销毁时解除事件绑定
  beforeDestroy() {
    this.$root.$off('nowIndexeFn')
  },
}
</script>

<style scoped>
.detailPageBox{
  padding-top: 54px;
}
.navBarBox{
  height:97px;
  border-top: 1px solid #151a21;
  border-bottom: 1px solid #151a21;
  position: relative;
  background-color: #151a21;
}
.navBarBox img{
  position: absolute;
  left:0px;
  top:0;
}
.navBarList{
  height:97px;
  width: 1000px!important;
  padding-left: 30px;
  max-width: 100%!important;
  margin: 0 auto!important;
  position: relative;
}
.bjys{
  width: 500px;
  height:97px;
  position: absolute;
  left:-500px;
  top:0;
  background-color: #fff;
}
.navBarList li{
  list-style: none;
  float: left;
  height:97px;
  padding: 0 20px;
  line-height: 97px;
  background-color: #151a21;
  color: #999;
  font-size: 18px;
}
.chooseActive{
  width: 242px;
  text-align: center;
  font-size: 30px !important;
  color: #4e4e4e !important;
  padding: 0 !important;
  font-weight: bold;
  background-image: url('../common/images/jx.png');
}
.controllActive{
  padding-left: 1px !important;
}
/*游戏玩法详情样式*/
.detailPage{
  width: 1030px;
  margin-top: 40px;
  margin:0 auto;
}
.detailPageList{
  
}
.editImg1{
  width: 100%;
}
</style>
