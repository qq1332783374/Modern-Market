<template>
    <div class="login">
        <form class="form-horizontal" role="form" v-if="!_getLoginInfo.isLogin">
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
                    <button type="button" class="btn btn-default" @click="login">登录</button>
                </div>
            </div>
        </form>
		<div v-else>
             <div class="jumbotron">
                <h1>
                    欢迎{{_getLoginInfo.loginInfo.username}}
                </h1>
                <p>尽情购物吧！</p>
            </div>
		</div>
    </div>
</template>

<script>
import {tipsIsShow} from 'assets/js/tips'
export default {
    name:'login',
    data() {
        return {
            username:'',
            password:''
        }
    },
    methods: {
        login(){
            //this.$store.dispatch('tipsIsShow',tipsIsShow(true,'aaaa','alert-danger'))
            if(this.username.length == 0){
                this.$store.dispatch('tipsIsShow',tipsIsShow(true,'请输入用户名','alert-warning'))
            }else if(this.password.length == 0){
                this.$store.dispatch('tipsIsShow',tipsIsShow(true,'请输入密码','alert-warning'))
            }else{
                var obj = {
                    username: this.username,
                    password: this.password
                }
                this.$store.dispatch('userLogin',obj)
            }
            
        },
        
    },
    computed: {
        _getLoginInfo(){
            return this.$store.getters.getIsLoginInfo
        }
    }
}
</script>

<style scoped>

</style>

