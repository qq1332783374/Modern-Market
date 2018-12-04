<template>
	<div class="goodsLeftBar">
        <div class="col-md-3">
            <div class="list-group ">
                <router-link to="/goodsManage/allGoodsManageList" class="list-group-item">
                    全部
                </router-link>
                <router-link to="/goodsManage/manGoodsManageList" class="list-group-item">
                    男装管理
                </router-link>
                <router-link to="/goodsManage/womanGoodsManageList" class="list-group-item">
                    女装管理
                </router-link>
                <router-link to="/goodsManage/eatGoodsManageList" class="list-group-item">
                    零食管理
                </router-link>
            </div> 
            <add-bar></add-bar>
        </div>
	</div>
</template>

<script>
import addBar from './addBar'
	export default {
        name:'goodsLeftBar',
        components:{
            addBar
        },
        created(){
            this.getGoodsCategory()
        },
        watch:{
            "$route":"getGoodsCategory"
        },
        methods:{
            getGoodsCategory(){
                //console.log(this.$route.meta.sid)
                this.$store.dispatch('getGoodsList',this.$route.meta.sid)
            }
        },
	}
</script>

<style scoped="scoped">
.list-group-item.router-link-active {
    z-index: 2;
    color: #fff;
    background-color: #337ab7;
    border-color: #337ab7;
}	
</style>