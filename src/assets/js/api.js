import axios from 'axios'
// 请求商品列表数据
export function getGoodsListData(url,params){
    return axios.get(url,{params:{sid:params}}||null).then((res) =>{
        return res.data
    }).catch((e) =>{
        console.log(e)
    })
}
// 提交数据
export function postData(url,params){
    return axios.post(url,params||null).then((res) =>{
        return res.data
    }).catch((e) =>{
        console.log(e)
    })
}
// 请求商品详情数据
export function getGoodsDetailData(url,sid,id){
    return axios.get(url,{params:{sid:sid,id:id}}).then((res) =>{
        return res.data
    }).catch((e) =>{
        console.log(e)
    })
}
// 请求订单列表
export function getOrdersData(url,params){
    return axios.get(url,{params:{sid:params}}||null).then((res) =>{
        return res.data
    }).catch((e) =>{
        console.log(e)
    })
}