<template>
    <div class="addgoods">
        <div class="col-md-9">
            <form class="form-horizontal" role="form">
                <div class="form-group">
                   <h4 class="text-center text-info">添加商品</h4>
                </div>
                <div class="form-group">
                    <label for="firstname" class="col-sm-2 control-label">图片预览</label>
                    <div class="col-sm-10">
                        <div v-if="simg">
                            <img :src="simg"  width="360" height="360">
                        </div>
                        <div v-else class="readImg">
                            <p>图片预览</p>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="lastname" class="col-sm-2 control-label">图片地址</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control"  placeholder="请输入图片地址" v-model="simg">
                    </div>
                </div>
                <div class="form-group">
                    <label for="lastname" class="col-sm-2 control-label">商品名称</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control"  placeholder="请输入商品名称" v-model="stitle">
                    </div>
                </div>
                <div class="form-group">
                    <label for="lastname" class="col-sm-2 control-label">商品分类</label>
                    <div class="col-sm-10">
                        <select v-model="sid" class="form-control">
                            <option :value="101">男装</option>
                            <option :value="201">女装</option>
                            <option :value="301">零食</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="lastname" class="col-sm-2 control-label">商品描述</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control"  placeholder="请输入商品描述" v-model="sdesc">
                    </div>
                </div>
                <div class="form-group">
                    <label for="lastname" class="col-sm-2 control-label">商品价格</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control"  placeholder="请输入商品价格" v-model="sprice">
                    </div>
                </div>
                <div class="form-group">
                    <label for="lastname" class="col-sm-2 control-label">折后价格</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control"  placeholder="请输入折后价格" v-model="sdiscount">
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <button type="button" class="btn btn-info" @click="addGoods">添加</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name:'addGoods',
    data(){
        return {
            sid:101,
            simg:'',
            stitle:'',
            sdesc:'',
            sprice:'',
            sdiscount:''
        }
    },
    methods:{
        addGoods(){
            var data = {
                sid:this.sid,
                simg:this.simg,
                stitle:this.stitle,
                sdesc:this.sdesc,
                sprice:this.sprice,
                sdiscount:this.sdiscount
            }
            this.$store.dispatch('addGoods',data)
        }
    }
}
</script>

<style scoped>
.readImg{
    width: 360px;
    height: 360px;
    background: #e5e5e5;
    text-align: center;
    line-height: 360px;
    color: #666;
    font-size: 24px;
}
</style>
