import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// axios 函数
import {getGoodsListData,postData,getGoodsDetailData,getOrdersData} from 'assets/js/api'

Vue.use(Vuex)

const state = {
    tipsIsShow:{isShow:false,txt:'提示语',className:'alert-success'},
    isLogin: JSON.parse(localStorage.getItem('loginInfo')) ||{isLogin:false,loginInfo:null},
    goodsList:[],
    goodsDetail:{},
    shopCartInfo:[],
    ordersList:[]
}

const getters = {
    getTipsIsShow(){ //提示语句
        return state.tipsIsShow
    },
    getIsLoginInfo(){  // 登录信息
        return state.isLogin
    },
    getGoodsList(){  // 商品列表
        return state.goodsList
    },
    getGoodsDetail(){ // 商品详情
        return state.goodsDetail
    },
    getShopCartInfo(){ // 购物车信息
        return state.shopCartInfo
    },
    getOrdersList(){ // 订单列表
        return state.ordersList
    }
}

const actions = {
    tipsIsShow(ctx,obj){ //提示语句
        ctx.commit('tipsIsShow',obj)
    },
    userLogin(ctx,obj){ // 登录信息
        var url = 'projectApi/login.php'
        // post 请求
        var params = new URLSearchParams
        params.append('username',obj.username)
        params.append('password',obj.password)
        postData(url,params).then((res) =>{
            if(res.code == 1){  // 登录成功
                ctx.commit('userLogin',res)
            }else if(res.code == 2){  // 密码不正确
                ctx.commit('userLogin',res)
            }else if(res.code == 3){ // 用户名不存在
                ctx.commit('userLogin',res)
            }
        })
    },
    logout(ctx,obj){  //  注销
        ctx.commit('logout',obj)
    },
    getGoodsList(ctx,sid){  // 商品分类列表
        var url = 'projectApi/shopinfo.php'
        if(sid == undefined){  //请求全部商品
            getGoodsListData(url).then((res) =>{
                ctx.commit('getGoodsList',res)
            })
        }else{  // 请求分类商品
            getGoodsListData(url,sid).then((res) =>{
                ctx.commit('getGoodsList',res)
            })
        }
    },
    getGoodsDetail(ctx,params){ // 商品详情
        var url = 'projectApi/shopdetail.php'
        getGoodsDetailData(url,params.sid,params.id).then((res) =>{
            ctx.commit('getGoodsDetail',res[0])
        })
    },
    addShopCartInfo(ctx,obj){ // 添加购物车信息
        ctx.commit('addShopCartInfo',obj)
    },
    changeShopCartInfo(ctx,arr){  // 结算后的购物车
        ctx.commit('changeShopCartInfo',arr)
    },
    addOrder(ctx,orders){  // 添加订单
        var url = 'projectApi/addorder.php'
        var params = new URLSearchParams
        params.append('obj',JSON.stringify(orders))
        postData(url,params).then((res) =>{
            console.log(res)
        })
    },
    getOrders(ctx){  // 获取订单列表
        var url = 'projectApi/orderinfo.php'
        getOrdersData(url).then((res)=>{
            ctx.commit('getOrders',res)
        })
    },
    updateInfo(ctx,obj){  // 修改商品
        var params = new URLSearchParams
        params.append('id',obj.id)
        params.append('simg',obj.simg)
        params.append('stitle',obj.stitle)
        params.append('sdesc',obj.sdesc)
        params.append('sprice',obj.sprice)
        params.append('sdiscount',obj.sdiscount)
        var url = 'projectApi/update.php'
        postData(url,params)
            .then((res) =>{
                var data = {
                    code:res.data,
                    item:obj
                }
                ctx.commit('updateInfo',data)
            })
            .catch((e) =>{
                console.log(e)
            })
    },
    delInfo(ctx,id){  // 删除商品
        var url = 'projectApi/delshop.php'
        var params = new URLSearchParams
        params.append('id',id)
        axios.post(url,params)
            .then((res) =>{
                console.log(res)
                ctx.commit('delInfo',id)
            })
            .catch((e) =>{
                console.log(e)
            })
    },
    addGoods(ctx,obj){ // 添加商品
        var url = 'projectApi/add.php'
        var params = new URLSearchParams
        params.append('sid',obj.sid)
        params.append('simg',obj.simg)
        params.append('stitle',obj.stitle)
        params.append('sdesc',obj.sdesc)
        params.append('sprice',obj.sprice)
        params.append('sdiscount',obj.sdiscount)
        postData(url,params)
            .then((res) =>{
                if(res == 1){
                    ctx.commit('addGoods','添加成功')
                }
            })
            .catch((e) =>{
                console.log(e)
            })
    },
}

const mutations = {
    tipsIsShow(state,obj){ //提示语句
        state.tipsIsShow = obj
        // 自动关闭
        setTimeout((res) =>{
            state.tipsIsShow.isShow = false
        },1500)
    },
    userLogin(state,obj){  // 登录信息
        localStorage.setItem('loginInfo','')
        if(obj.code == 1){  // 登录成功
            state.isLogin.isLogin = true
            state.isLogin.loginInfo = obj
            // 本地储存
            localStorage.loginInfo = JSON.stringify(state.isLogin)
            // 提示语句
            state.tipsIsShow.isShow = true
            state.tipsIsShow.txt = '登录成功'
            state.tipsIsShow.className = 'alert-success'
            // 自动关闭提示语句
            setTimeout((res) =>{
                state.tipsIsShow.isShow = false
            },1500)
        }else if(obj.code == 2){  // 密码不正确
            state.isLogin.isLogin = false
            state.isLogin.loginInfo = obj

            // 提示语句
            state.tipsIsShow.isShow = true
            state.tipsIsShow.txt = '登录失败，请检查密码是否正确'
            state.tipsIsShow.className = 'alert-danger'
            // 自动关闭提示语句
            setTimeout((res) =>{
                state.tipsIsShow.isShow = false
            },1500)
        }else if(obj.code == 3){  // 用户名不存在
            state.isLogin.isLogin = false
            state.isLogin.loginInfo = obj

            // 提示语句
            state.tipsIsShow.isShow = true
            state.tipsIsShow.txt = '登录失败，用户名不存在'
            state.tipsIsShow.className = 'alert-danger'
            // 自动关闭提示语句
            setTimeout((res) =>{
                state.tipsIsShow.isShow = false
            },1500)
        }
    },
    logout(state,obj){  // 注销
        state.isLogin.isLogin = obj
        var loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
        loginInfo.isLogin = obj
        localStorage.loginInfo = JSON.stringify(loginInfo)
        // 提示语句
        state.tipsIsShow.isShow = true
        state.tipsIsShow.txt = '注销成功，欢迎下次再来'
        state.tipsIsShow.className = 'alert-info'
        // 自动关闭提示语句
        setTimeout((res) =>{
            state.tipsIsShow.isShow = false
        },1500)
    },
    getGoodsList(state,obj){  //商品列表
        state.goodsList = obj
    },
    getGoodsDetail(state,obj){ // 商品详情
        state.goodsDetail = obj
    },
    addShopCartInfo(state,obj){ // 购物车信息
        // 购物车数据查重累加
        var index = -9999
        var isHave = false
        if(state.shopCartInfo.length>0){
            for(var i=0;i<state.shopCartInfo.length;i++){
                if(state.shopCartInfo[i].id == obj.id){
                    index = i
                    isHave = true
                    break
                }
            }
            if(isHave){ // 如果存在数量累加
                state.shopCartInfo[index].snum += obj.snum
            }else{ // 否则添加商品
                state.shopCartInfo.push(obj)
            }
        }else{
            state.shopCartInfo.push(obj)
        }
    },
    changeShopCartInfo(state,arr){ // 结算后的购物车
        state.shopCartInfo = arr
    },
    getOrders(state,arr){  // 订单列表
        state.ordersList = arr
    },
    updateInfo(state,data){  // 修改商品
        if(data.code == 1){
            state.tipsIsShow.isShow = true
            state.tipsIsShow.txt = '修改成功'
            // 关闭
            setTimeout(() =>{
                state.tipsIsShow.isShow = false
            }, 1500)
            var index = -9999
            for(var i=0;i<state.goodsList.length;i++){
                if(state.goodsList[i].id == data.item.id){
                    index = i
                    break
                }
            }
            state.goodsList.splice(index,1,data.item)
        }
    },
    delInfo(state,id){  // 删除商品
        var index = -9999
        for(var i=0;i<state.goodsList.length;i++){
            if(state.goodsList[i].id == id){
                index = i 
                break
            }
        }
        state.goodsList.splice(index,1)
    },
    addGoods(state,txt){
        state.tipsIsShow.isShow = true
        state.tipsIsShow.txt = txt
        // 关闭
        setTimeout(() =>{
            state.tipsIsShow.isShow = false
        }, 1500)
    },
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})