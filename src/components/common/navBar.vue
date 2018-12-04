<template>
    <div class="navbars">
        <nav class="navbar navbar-default" role="navigation"> 
			<div class="container-fluid"> 
				<div class="navbar-header"> 
					<a class="navbar-brand" href="#">现代超市</a> 
				</div> 
				<div>
					<ul class="nav navbar-nav">
						<li class="">
							<router-link to="/home">
								首页
							</router-link>
						</li>
						<li>
							<router-link to="/goods">
								商品
							</router-link>
						</li>
						<li>
							<router-link to="/goodsManage">
								商品管理
							</router-link>
						</li>
						<li>
							<router-link to="/order">
								订单
							</router-link>
						</li>
					</ul>
				</div>
				 <div>
                    <ul class="nav navbar-nav navbar-right" v-if="!_getLoginInfo.isLogin"> 
                        <li>
                            <router-link to="/register">
                                注册
                            </router-link>
                        </li> 
                        <li>
                            <router-link to="/login">
                                登录
                            </router-link>
                        </li> 
                    </ul> 
                    <ul class="nav navbar-nav navbar-right" v-else> 
                        <li>
                            <a href="#">
                                用户:{{_getLoginInfo.loginInfo.username}}
                            </a>
                        </li>
                        <li>
                            <a href="#" @click="logout">
                                注销
                            </a>
                        </li> 
                    </ul> 
                </div>
			</div> 
		</nav>
    </div>
</template>

<script>
export default {
    name:'navBar',
    computed: {
        _getLoginInfo(){
            return this.$store.getters.getIsLoginInfo
        }
    },
    methods: {
        logout(){  // 注销
            this.$store.dispatch('logout',false)
            this.$router.push({path:'/login'})
        }
    }
}
</script>

<style scoped>
.navbar-default {
		background-color: #fff;
		border-color: #e7e7e7;
	}
	.navbar-default .navbar-nav a.router-link-active{
		color: #555;
		background-color: #e7e7e7;
	}
</style>

