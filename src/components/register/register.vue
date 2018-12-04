<template>
    <div class="resgister">
        <form class="form-horizontal" role="form">
            <div class="form-group">
                <label class="col-sm-2 control-label">用户名</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" placeholder="请输入用户名" v-model="username">
                </div>
            </div>
            <div class="form-group">
                <label  class="col-sm-2 control-label">密码</label>
                <div class="col-sm-9">
                    <input type="password" class="form-control" placeholder="请输入密码" v-model="password">
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button type="button" class="btn btn-default" @click="register">注册</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
// 请求
import {getData,postData} from 'assets/js/api'
// 提示语句
import {tipsIsShow} from 'assets/js/tips'
export default {
    name:'resgister',
    data(){
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        register(){
            if(this.username.length == 0){
                this.$store.dispatch('tipsIsShow',tipsIsShow(true,'请输入用户名','alert-warning'))
            }else if(this.password.length == 0){
                this.$store.dispatch('tipsIsShow',tipsIsShow(true,'请输入密码','alert-danger'))
            }else{
                var url = 'projectApi/register.php'
                var params = new URLSearchParams
                params.append('username',this.username)
                params.append('password',this.password)
                postData(url,params).then((res) =>{
                    // 2 代表成功  1 代表失败
                    if(res == 2){
                        this.$store.dispatch('tipsIsShow',tipsIsShow(true,'注册成功','alert-success'))

                        setTimeout(() =>{
                            if(confirm('是否前去登录？')){
                                this.$router.push({path:'/login'})
                            }
                        },1600)
                    }else if(res == 1){
                        this.$store.dispatch('tipsIsShow',tipsIsShow(true,'注册失败，用户名已存在','alert-danger'))
                    }
                })
            }
        }
    }
}
</script>

<style scoped>

</style>

