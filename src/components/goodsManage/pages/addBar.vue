<template>
    <div class="addgoods">
        <div class="panel panel-info">
            <div class="panel-heading">
                <h3 class="panel-title">添加商品</h3>
            </div>
            <div class="panel-body">
                <div class="list-group ">
                    <router-link to="/goodsManage/addGoods" class="list-group-item">
                        添加
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'addBar'
}
</script>

<style scoped>
.list-group-item.router-link-active {
    z-index: 2;
    color: #fff;
    background-color: #337ab7;
    border-color: #337ab7;
}	
</style>
