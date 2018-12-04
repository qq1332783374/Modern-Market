import Vue from 'vue'
import Router from 'vue-router'
import test from 'components/test/test'
import app from '../App'
//home
import home from 'components/home/home'
// 商品
import goods from 'components/goods/goods'
// 商品列表
import goodsList from 'components/goods/pages/goodsList'
// 商品详情
import goodsDetail from 'components/goods/pages/goodsDetail'
// 商品管理
import goodsManage from 'components/goodsManage/goodsManage'
// 商品管理列表
import goodsManageList from 'components/goodsManage/pages/goodsManageList'
// 添加商品
import addGoods from 'components/goodsManage/pages/addGoods'
//订单
import order from 'components/order/order'
//登录
import login from 'components/login/login'
// 注册
import register from 'components/register/register'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'app',
      redirect:'/home',
      component:app
    }
    ,
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods,
      redirect:'/goods/all',
      children:[
        {
          path: 'all',
          name:'all',
          component:goodsList
        },
        {
          path: 'man',
          name: 'man',
          component: goodsList,
          meta: {
            sid: 101
          }
        },
        {
          path: 'woman',
          name: 'woman',
          component: goodsList,
          meta: {
            sid: 201
          }
        },
        {
          path: 'eat',
          name: 'eat',
          component: goodsList,
          meta: {
            sid: 301
          }
        }
      ]
    },
    {
      path: '/goodsManage',
      name: 'goodsManage',
      component: goodsManage,
      redirect:'/goodsManage/allGoodsManageList',
      children:[
        {
          path: 'allGoodsManageList',
          name:'allGoodsManageList',
          component:goodsManageList,
          meta:{
            requiresAuth:true//判断页面是否需要登录
          }
        },
        {
          path: 'manGoodsManageList',
          name: 'manGoodsManageList',
          component: goodsManageList,
          meta: {
            sid: 101,
            requiresAuth:true//判断页面是否需要登录
          }
        },
        {
          path: 'womanGoodsManageList',
          name: 'womanGoodsManageList',
          component: goodsManageList,
          meta: {
            sid: 201,
            requiresAuth:true//判断页面是否需要登录
          }
        },
        {
          path: 'eatGoodsManageList',
          name: 'eatGoodsManageList',
          component: goodsManageList,
          meta: {
            sid: 301,
            requiresAuth:true//判断页面是否需要登录
          }
        },
        {
          path: 'addGoods',
          name: 'addGoods',
          component: addGoods,
          requiresAuth:true//判断页面是否需要登录
        }
      ]
    },
    {
      path:'/goodsDetail',
      name:'goodsDetail',
      component:goodsDetail
    },
    {
      path: '/order',
      name: 'order',
      component: order,
      meta:{
        requiresAuth:true//判断页面是否需要登录
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
  ]
})
