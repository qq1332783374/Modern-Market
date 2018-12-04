<template>
    <div class="order">
        <table class="table table-hover">
        <caption>订单详情</caption>
            <thead>
                <tr>
                    <th>商品</th>
                    <th>单价</th>
                    <th>数量</th>
                    <th>总价</th>
                    <th>下单日期</th>
                    <th>收货地址</th>
                    <th>用户</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in _getOrdersList" :key="index">
                    <td class="goods">
                        <div class="media">
                            <div class="media-left">
                                <img :src="item.simg" class="media-object" style="width:60px">
                            </div>
                            <div class="media-body">
                                <h5 class="media-heading">{{item.stitle}}</h5>
                                <p class="desc">{{item.sdesc}}...</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        {{item.sprice}}￥
                    </td>
                    <td>
                        {{item.snum}}
                    </td>
                    <td>
                        {{item.sprice*item.snum}}￥
                    </td>
                    <td>
                        {{item.stimes}}
                    </td>
                    <td>
                        {{item.saddress}}
                    </td>
                    <td>
                        {{item.susername}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name:'order',
    methods: {
        _getOrdersData(){
            this.$store.dispatch('getOrders')
        }
    },
    created() {
        this._getOrdersData()
    },
    computed:{
        _getOrdersList(){
            return this.$store.getters.getOrdersList
        }
    }
}
</script>

<style scoped>
.goods{
    width: 250px;
}
.desc{
    font-size: 12px;
}
.media-body{
    text-align: left;
}
table thead tr th{
    text-align: center;
}
table tr td{
    vertical-align: middle;
    text-align: center;
}
</style>

