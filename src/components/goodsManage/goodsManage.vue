<template>
	<div class="goodsManagement">
		<left-bar></left-bar>
		<router-view @update="update" @del="del"></router-view>
		<modal :modalMsg="modalMsg" @updateInfo="updateInfo" @delInfo="delInfo"></modal>
	</div>
</template>

<script>
import leftBar from './pages/goodsManageBar'
import goodsTable from './pages/goodsManageList'
import modal from '@/components/common/modal'
	export default {
		name:'goodsManagement',
		components:{
			leftBar,
			goodsTable,
			modal
		},
		data(){
			return {
				modalMsg:{
					modalIsShow:false,
					msg:'修改信息'
				}
			}
		},
		methods: {
			update(item){
				this.modalMsg = {
					modalIsShow:true,
					msg:'修改信息',
					id:item.id,
					stitle:item.stitle,
					simg:item.simg,
					sdesc:item.sdesc,
					sprice:item.sprice,
					sdiscount:item.sdiscount,
					status:'update'
				}
			},
			updateInfo(item){
				this.$store.dispatch('updateInfo',item)
			},
			del(id){
				this.modalMsg = {
					modalIsShow:true,
					msg:'删除',
					id:id,
					status:'del'
				}
			},
			delInfo(id){
				this.$store.dispatch('delInfo',id)
			}
		}
	}
</script>

<style scoped="scoped">
	
</style>