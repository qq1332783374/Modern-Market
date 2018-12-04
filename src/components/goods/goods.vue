<template>
    <div class="goods">
        <goods-tabs></goods-tabs>
        <div class="row">
            <div class="col-md-8">
                <router-view></router-view>
            </div>
            <div class="col-md-4">
                <shop-cart></shop-cart>
            </div>
        </div>
    </div>
</template>

<script>
import goodsTabs from './pages/goodsTabs'
import shopCart from 'components/shopCart/shopCart'
export default {
    name:'goods',
    components: {
        goodsTabs,
        shopCart
    }
}
</script>

<style scoped>

</style>

