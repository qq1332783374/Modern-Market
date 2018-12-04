<template>
	<div class="goodsManage">
		<div class="col-md-9">
			<table class="table table-bordered table-hover">
				<thead>
					<tr>
						<td>名称</td>
						<td>图片</td>
						<td>描述</td>
						<td>价格</td>
						<td class="ed">折后</td>
						<td>操作</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in goodsList" :key="index">
						<td>{{item.stitle}}</td>
						<td>
							<img :src="item.simg" :alt="item.id" width="60px">
						</td>
						<td>
							{{item.sdesc}}
						</td>
						<td>
							{{item.sprice}}
						</td>
						<td>
							{{item.sdiscount}}
						</td>
						<td class="btns">
							<button class="btn btn-info btn-sm" @click="update(item)">修改</button>
							<button class="btn btn-danger btn-sm" @click="del(item.id)">删除</button>
						</td>
					</tr>
				</tbody>
				
			</table>
		</div>
	</div>
</template>

<script>
	export default {
		name:'goodsManage',
		methods: {
			_getGoodsList(){
				if(this.$route.name == "all") {
					this.$store.dispatch('_getGoodsList')
				}
			},
			update(item){
				this.$emit('update',item)
			},
			del(id){
				this.$emit('del',id)
			}
		},
		created() {
			this._getGoodsList()
		},
		computed:{
			goodsList(){
				return this.$store.getters.getGoodsList
			}
		}
	}
</script>

<style scoped="scoped">
	table tr td{
		vertical-align: middle;
	}
	.ed{
		min-width: 50px;
	}
	.btns{
		min-width: 120px;
	}
</style>