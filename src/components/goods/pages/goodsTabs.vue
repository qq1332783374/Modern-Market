<template>
    <div class="goodsTabs">
        <ul class="nav nav-tabs">
            <li>
                <router-link to="/goods/all">
                    全部
                </router-link>
            </li>
            <li>
                <router-link to="/goods/man">
                    男装
                </router-link>
            </li>
            <li>
                <router-link to="/goods/woman">
                    女装
                </router-link>
            </li>
            <li>
                <router-link to="/goods/eat">
                    零食
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:'goodsTabs',
    created(){
        this.getGoodsList()
    },
    watch:{
        "$route":"getGoodsList"
    },
    methods:{
        getGoodsList(){
            //console.log(this.$route.meta.sid)
            this.$store.dispatch('getGoodsList',this.$route.meta.sid)
        }
    },
    
}
</script>

<style scoped>
.nav-tabs>li>a.router-link-active{
    color: #555;
    cursor: default;
    background-color: #fff;
    border: 1px solid #ddd;
    border-bottom-color: transparent;
}
</style>
