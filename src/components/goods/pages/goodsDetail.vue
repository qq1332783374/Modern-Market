<template>
	<div class="goodsDetail">
		<div class="row">
			<div class="col-md-6">
				<img :src="getGoodsDetaile.simg" alt="getGoodsDetaile.id" width="100%">
			</div>
			<div class="col-md-6">
				<h4>{{getGoodsDetaile.stitle}}</h4>
                <p>
                    {{getGoodsDetaile.sdesc}}
                </p>
				<p class="price">
					价格：<span class="price">￥{{getGoodsDetaile.sprice}}</span>
				</p>
				<ul class="ind-panel">
					<li class="ind-item ind-reviewCount canClick line3">
						<div class="indcon">
							<span class="label">累计评价</span>
							<span class="count">1234</span>
						</div>
					</li>
					<li class="ind-item ind-reviewCount canClick line3">
						<div class="indcon">
							<span class="label">积分</span>
							<span class="count">{{getGoodsDetaile.sprice}}</span>
						</div>
					</li>
				</ul>
				<div class="key">
					<div class="skin">
						<span class="num">
							数量：
						</span>
						<button class="btn btn-default btn-sm" @click="sub">-</button>
						<input type="text" class="numTxt" v-model="shopNum">
						<button class="btn btn-default btn-sm" @click="add">+</button>
						
					</div>
				</div>
				<div class="btns">
					<div class="buy">
						<a href="#" @click="buy">
							立即购买
						</a>
					</div>
					<div class="shopCart">
						<a href="#" @click="addShopCart">
							加入购物车
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {tipsIsShow} from 'assets/js/tips'
export default {
    name: 'goodsDetail',
    data(){
        return {
            info:{},
            shopNum:0
        }
    },
    computed: {
       getGoodsDetaile(){
           return this.$store.getters.getGoodsDetail
       }
    },
    methods: {
        _getGoodsDtail(){
            var params = {
                sid: this.$route.query.sid,
                id: this.$route.query.id
            }
            this.$store.dispatch('getGoodsDetail',params)
        },
        sub(){  // 减减少数量
            if(this.shopNum<=0){
                this.$store.dispatch('tipsIsShow',tipsIsShow(true,'至少选择一件商品','alert-warning'))
            }else{
                this.shopNum--
            }
        },
        add(){  // 增加商品数量
            this.shopNum ++
        },
        addShopCart(){  // 加入购物车
            if(this.shopNum<=0){
                 this.$store.dispatch('tipsIsShow',tipsIsShow(true,'加入购车失败,请至少选择一件商品','alert-warning'))
            }else{
                var shopInfo = {
                    sid: this.$route.query.sid,
                    id:  this.$route.query.id,
                    stitle: this.getGoodsDetaile.stitle,
                    sdesc: this.getGoodsDetaile.sdesc,
                    simg: this.getGoodsDetaile.simg,
                    sprice: this.getGoodsDetaile.sprice,
                    sdiscount: this.getGoodsDetaile.sdiscount,
                    snum: this.shopNum,
                    susername: this.$store.getters.getIsLoginInfo.loginInfo.username
                }
                this.$store.dispatch('addShopCartInfo',shopInfo)
                this.$store.dispatch('tipsIsShow',tipsIsShow(true,'成功加入购物车','alert-success'))
                
            }
        },
        buy(){
            if(this.$store.getters.getIsLoginInfo.isLogin&&this.shopNum>0){
                console.log(1)
            }else if(!this.$store.getters.getIsLoginInfo.isLogin){
                this.$store.dispatch('tipsIsShow',tipsIsShow(true,'请登录','alert-warning'))
                setTimeout(()=>{
                    if(confirm('是否前去登录界面？')){
                        this.$router.push({path:'/login'})
                    }
                },1800)
            }else if(this.shopNum<=0){
                this.$store.dispatch('tipsIsShow',tipsIsShow(true,'购买失败,请至少选择一件商品','alert-warning'))
            }
        }
    },
    created(){
        this._getGoodsDtail()
    }
}
</script>

<style scoped>
.price{
	background: #ddd;
    padding: 6px;
}
.price span{
	color: #FF0036;
    font-size: 24px;
    font-weight: bolder;
}
ul li{
	list-style: none;
}
.ind-panel{
	border: 1px dotted #c9c9c9;
    border-width: 1px 0;
    margin: -1px 20px 0 0;
    padding: 10px 0;
    position: relative;
    overflow: hidden;
    clear: both;
    display: flex;
}
.ind-item {
    float: left;
    width: 33%;
    text-align: center;
    position: relative;
    left: -1px;
    border-left: 1px solid #e5dfda;
    flex: 1;
    line-height: 16px;
}
.ind-panel .canClick {
    cursor: pointer;
}
.ind-item .label, .ind-item .monthavg {
    display: inline-block;
    line-height: 16px;
    height: 16px;
    color: #999;
}
.ind-panel .count {
    display: inline-block;
    line-height: 16px;
    height: 16px;
    color: #FF0036;
    font-weight: 700;
    margin-left: 3px;
}
.skin{
	padding: 10px;
}
.numTxt{
	padding: 4px;
    border: 1px solid #ddd;
    vertical-align: middle;
}
.btns{
	display: flex;
	padding: 40px;
}
.btns div{
	flex: 1;
	text-align: center;
}
.btns div a{
	height: 38px;
    line-height: 38px;
    text-align: center;
    font-size: 16px;
	margin-right: 0;
    float: left;
    overflow: hidden;
    position: relative;
    width: 178px;
    background-color: #ffeded;
    border: 1px solid #FF0036;
    color: #FF0036;
    font-family: 'Microsoft Yahei';
	text-decoration: none;
}
.btns div.buy a{
	margin-right: 0;
    float: left;
    overflow: hidden;
    position: relative;
    width: 178px;
    background-color: #ffeded;
    border: 1px solid #FF0036;
    color: #FF0036;
    font-family: 'Microsoft Yahei';
}
.btns div.shopCart a{
	background-color: #ff0036;
    border: 1px solid #ff0036;
    color: #fff;

}
</style>

