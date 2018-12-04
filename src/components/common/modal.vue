<template>
    <div>
        <div class="modal" :class="{show:modalMsg.modalIsShow}">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" @click="close">&times;</button>
                        <h4 class="modal-title">{{modalMsg.title}}</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form" v-if="modalMsg.status == 'update'">
                            <div class="form-group">
                                <label for="firstname" class="col-sm-2 control-label">名称</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  placeholder="请输入名字" v-model="modalMsg.stitle">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="lastname" class="col-sm-2 control-label">图片地址</label>
                                <div class="col-sm-10">
                                    <textarea  class="form-control imgUrl" v-model="modalMsg.simg"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="firstname" class="col-sm-2 control-label">描述</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  placeholder="请输入名字" v-model="modalMsg.sdesc">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="firstname" class="col-sm-2 control-label">价格</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  placeholder="请输入名字" v-model="modalMsg.sprice">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="firstname" class="col-sm-2 control-label">折后</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  placeholder="请输入名字" v-model="modalMsg.sdiscount">
                                </div>
                            </div>
                        </form>
                        <div v-if="modalMsg.status == 'del'">
                            <h3>确定删除？</h3>
                        </div>
                        <div v-if="modalMsg.status == 'settlement'">
                            <form class="form-horizontal">
                                <div class="form-group">
                                    <label for="firstname" class="col-sm-2 control-label">收货地址</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"  placeholder="请输入收货地址" v-model="modalMsg.saddress">
                                    </div>
                                </div>
                                <div class="form-group text-center" v-if="tips.length!=0">
                                    <span class="text-danger">{{tips}}</span>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="close">关闭</button>
                        <div v-if="modalMsg.status == 'update'">
                            <button type="button" class="btn btn-primary" @click="change(modalMsg)">提交更改</button>
                        </div>
                        <div v-if="modalMsg.status == 'del'">
                            <button type="button" class="btn btn-danger" @click="del(modalMsg.id)">删除</button>
                        </div>
                        <div v-if="modalMsg.status == 'settlement'">
                            <button type="button" class="btn btn-primary" @click="settlementAll">结算</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'modal',
    props:['modalMsg'],
    data(){
        return {
            tips:''
        }
    },
    methods: {
        close(){
            this.modalMsg.modalIsShow = false
        },
        settlementAll(){
            if(this.modalMsg.saddress.length!=0){
                this.tips = ''
                this.$emit('settlementAll',this.modalMsg.saddress)
                this.close()
            }else{
                this.tips = '收货地址不能为空！'
            }
            
        },
         change(item){
            this.$emit('updateInfo',item)
            this.close()
        },
        del(id){
            this.$emit('delInfo',id)
            this.close()
        },
    }
}
</script>

<style scoped>
.modal{
    background: rgba(0,0,0,0.55);
}
.modal-footer div{
    float: right;
    margin-left: 5px;
}
</style>


