<template>
    <div class="shopCart">
        <h3 class="text-center">购物车</h3>
        <div v-if="_getShopCartInfo.length!=0">
            <div class="media" v-for="(item,index) in _getShopCartInfo" :key="index" ref="item">
				<div class="media-left">
					<img :src="item.simg" class="media-object" style="width:70px">
				</div>
				<div class="media-body">
					<h5 class="media-heading">{{item.stitle}}</h5>
					<p>
						数量：
						<button type="button" class="btns" @click="sub(index)">-</button>
						<input type="text" v-model="item.snum" class="num">
						<button type="button" class="btns" @click="add(index)">+</button>
						<input type="checkbox" style="float:right;" v-model="checkItem" :value="item">
					</p>
					<p>
						价格：{{item.snum*item.sprice}}
					</p>
				</div>
			</div>
            <div class="settlement">
				<div class="choose">
					<input type="checkbox" @click="selectAll" :checked="_selectAll">全选
					<span class="delAll" @click="delAll">删除</span>
				</div>
				<div class="rigth-bar">
					<div class="chooseNum">
						已选择<span class="cNum">{{_allGoodsNum}}</span>件商品
					</div>
					<div class="allPrice">
						合计: <span class="aPrice">{{_allGoodsPrice}}</span> ￥
					</div>
					<div class="btn-area">
						<a href="#" @click="settlement">结算</a>
					</div>
				</div>
			</div>
        </div>
        <div v-else>
            <h4 class="text-center text-info">
				暂无商品...
			</h4>
        </div>
        <modal :modalMsg="modalMsg" @settlementAll="settlementAll"></modal>
    </div>
</template>

<script>
import {tipsIsShow} from 'assets/js/tips'
import modal from 'components/common/modal'
export default {
    name:'shopCart',
    data(){
        return {
            checkItem: [],
            modalMsg:{}
        }
    },
    components:{
        modal
    },
    computed: {
        _getShopCartInfo(){
            return this.$store.getters.getShopCartInfo
        },
        _selectAll(){
            return this.checkItem.length == this._getShopCartInfo.length?true:false
        },
        _allGoodsPrice(){ // 商品总价
            var sum = 0 
            for(var i=0;i<this.checkItem.length;i++){
                sum += parseFloat(this.checkItem[i].sprice)*parseFloat(this.checkItem[i].snum)
            }
            return sum
        },
        _allGoodsNum(){
            var sum = 0 
            for(var i=0;i<this.checkItem.length;i++){
                sum += parseInt(this.checkItem[i].snum)
            }
            return sum
        },
        
    },
    methods: {
        sub(index){ // 商品数量--
            if(this._getShopCartInfo[index].snum==0){
                if(confirm('是否删除当前商品？')){
                    this.$store.dispatch('tipsIsShow',tipsIsShow(true,'删除成功','alert-info'))
                    this._getShopCartInfo.splice(index,1)
                }
            }else{
                this._getShopCartInfo[index].snum--
            }
        },
        add(index){  //商品数量++
            this._getShopCartInfo[index].snum++
        },
        selectAll(){ //全选
            if(this._getShopCartInfo.length == this.checkItem.length){
                this.checkItem = []
            }else{
                this.checkItem = this._getShopCartInfo
            }
        },
        delAll(){ // 全部删除

        },
        settlement(){ // 结算
            if(!this.$store.getters.getIsLoginInfo.isLogin){
                this.$store.dispatch('tipsIsShow',tipsIsShow(true,'请登录','alert-info'))
                setTimeout(()=>{
                    if(confirm('是否前去登录界面？')){
                        this.$router.push({path:'/login'})
                    }
                },1800)
            }else if(this.checkItem.length == 0){
                this.$store.dispatch('tipsIsShow',tipsIsShow(true,'请选择要结算的商品','alert-warning'))
            }else{
                this.modalMsg = {
                    modalIsShow:true,
                    title:'结算',
                    saddress:'',
                    status:'settlement'
                }             
            }
            
        },
        settlementAll(saddress){
            var _this = this
            var arr = []
            // 商品查重
            for(var i=0;i<this._getShopCartInfo.length;i++){
                var obj1 = this._getShopCartInfo[i]
                var id1 = obj1.id
                var isHave = false
                for(var j=0;j<this.checkItem.length;j++){
                    var obj2 = this.checkItem[j]
                    var id2 = obj2.id
                    if(id1 == id2){
                        isHave = true
                        break
                    }
                }
                if(!isHave){
                    arr.push(obj1)
                }
                this.checkItem[i].saddress = saddress
                this.checkItem[i].stimes = _this._times()
            }
            // arr 是结算后的购物车数组
            this.$store.dispatch('changeShopCartInfo',arr)
            // this.checkItem 表示提交的订单
            this.$store.dispatch('addOrder',this.checkItem)
        },
        _times(){
            var myDate = new Date()
            var times = myDate.toLocaleDateString()
            return times
        }
    }
}
</script>

<style scoped>
.media{
		border: 1px solid #ccc;
		box-sizing: border-box;
		padding: 4px 4px 0px 4px;
	}
	.num{
		border: none;
		outline: none;
		width: 40px;
		text-align: center;
	}
	.btns{
		background: #fff;
		border: none;
		outline: none;
	}
	.del{
		float: right;
		color: #d90000;
		cursor: pointer;
	}
	.settlement{
		margin-top: 100px;
		height: 50px;
		min-width: 360px;
		line-height: 50px;
		box-sizing: border-box;
		padding: 0 0 0 3px;
		font-size: 12px;
		vertical-align: middle;
	}
	.choose{
		float: left;
	}
	.rigth-bar{
		float: right;
	}
	.rigth-bar div{
		float: left;
		margin-left: 10px;
	}
	.cNum{
		color: #f40;
		font-weight: 700;
		font-size: 14px;
		font-family: tohoma,arial;
	}
	.aPrice{
		color: #f40;
		font-weight: 700;
		font-size: 14px;
		font-family: tohoma,arial;
	}
	.btn-area a{
		display: inline-block;
		width: 75px;
		height: 50px;
		line-height: 50px;
		background: #f40;
		text-align: center;
		font-family: 'Lantinghei SC','Microsoft Yahei';
		font-size: 15px;
		-webkit-border-radius: 2px;
		-moz-border-radius: 2px;
		-ms-border-radius: 2px;
		border-radius: 2px;
		text-decoration: none;
		cursor: pointer;
		color: #fff;
	}
	a {
		color: #3c3c3c;
	}
	.delAll{
		cursor: pointer;
	}
	.delAll:hover{
		color: red;
	}
</style>

