import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/homepage'
import SignIn from '@/components/signIn/signIn'
import SignUp from '@/components/signUp/signUp'
import editPassword from '@/components/signIn/editPassword'
import DetailPage from '@/components/detailPage'
import exchange from '@/components/goodsExchange/exchange'
import goodsExchange from '@/components/goodsExchange/goodsExchange'
import paurse from '@/components/goodsExchange/paurse'
import exchangeDetail from '@/components/goodsExchange/exchangeDetail'
import search from '@/components/goodsExchange/search'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/sign_in',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/sign_up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/editPassword',
      name: 'editPassword',
      component: editPassword
    },
    {
      path: '/DetailPage',
      name: 'DetailPage',
      component: DetailPage
    },
    {
      path: '/exchange',
      name: 'exchange',
      component: exchange,
      redirect: '/exchange/goodsExchange',
      children:[
            {
               path:'/exchange/goodsExchange',
               component:goodsExchange
            },
            {
               path:'/exchange/paurse',
               component:paurse
            },
            {
               path:'/exchange/exchangeDetail',
               component:exchangeDetail
            },
            {
               path:'/exchange/search',
               component:search
            },
         ]
    },
    // {
    //   path: '/paurse',
    //   name: 'paurse',
    //   component: paurse
    // },
    // {
    //   path: '/exchangeDetail',
    //   name: 'exchangeDetail',
    //   component: exchangeDetail
    // },
  ]
})
