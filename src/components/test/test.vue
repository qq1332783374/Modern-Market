<template>
    <div class="test">
        test
    </div>
</template>

<script>
import {getGoodsListData,postData} from 'assets/js/api'
export default {
    name:'test',
    data(){
        return {
            shopInfo:[]
        }
    },
    created() {
        this._getData()
        this._postData()
    },
    methods: {
        _getData(){
            var url = 'projectApi/shopinfo.php'
            var params = 101
            getGoodsListData(url,params).then((res) =>{
                this.shopInfo = res
                console.log(this.shopInfo)
            })
        },
        _postData(){
            var url = 'projectApi/login.php'
            var params = new URLSearchParams
            params.append('username','a')
            params.append('password','123456')
            postData(url,params).then((res) =>{
                console.log(res)
            })
        }
    }
}
</script>

<style scoped>

</style>

