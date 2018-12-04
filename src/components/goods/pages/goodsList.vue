<template>
    <div class="goodsList">
        <div class="row">
			<div class="col-sm-6 col-md-3" v-for="(item, index) in _getGoodsList" :key="index">
				<router-link :to="{path:'/goodsDetail',query:{sid:item.sid,id:item.id}}">
                    <div class="thumbnail">
                        <img :src="item.simg" :alt="item.id">
                        <div class="caption">
                            <h5 class="title">{{item.stitle}}</h5>
                            <p>￥{{item.sprice}}</p>
                        </div>
                    </div>
                </router-link>
			</div>
		</div>
    </div>
</template>

<script>
export default {
    name:'goodsList',
    computed: {
        _getGoodsList(){  // 获取商品列表
            return this.$store.getters.getGoodsList
        }
    }
}
</script>

<style scoped>
.thumbnail .caption {
    padding: 9px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.thumbnail .caption .title{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}	
</style>

