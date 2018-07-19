
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

const state = {
  token:window.sessionStorage.getItem('token'),
  isMerchant:window.sessionStorage.getItem('isMerchant'),//用户信息
  scrollIndex:'',
  isShowColor:true,
  isShowVideo:false,
  nowIndex:0,
  showTopNav:true,//控制是否显示导航栏
  isSteps:false,//判断点击导航栏部分按钮是要滚动效果
  FMCValue:'',
  searchKey:''//搜索关键词
};
const mutations = {
  //存储token
  changetoken(state,data){
    state.token = data;
    window.sessionStorage.setItem('token', data);
  },
  //存储isMerchant
  changeMerchant(state,data){
    state.isMerchant = data;
    window.sessionStorage.setItem('isMerchant', data);
  },
  //清除token
  removetoken(state){
    state.token = null;
    window.sessionStorage.removeItem('token');
  },
   //清除isMerchant
  removeMerchant(state){
    state.isMerchant = null;
    window.sessionStorage.removeItem('isMerchant');
  },
  //滚动锚点实现方法
  scrollFn(state,data){
    state.scrollIndex = data;
  },
  //头部颜色改变
  isShowColorFn(state,data){
    state.isShowColor = data;
  },
  //控制视频播放
  isShowVideoFn(state,data){
    state.isShowVideo = data;
  },
   //索引
  nowIndexeFn(state,data){
    state.nowIndex = data;
  },
  //search搜索事件
  searchFn(state,data){
    state.searchKey = data;
     
  },
};
export default new Vuex.Store({
    state,mutations
});