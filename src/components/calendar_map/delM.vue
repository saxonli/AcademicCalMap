<template>
	<div>
		<div class="left-menu">
			<h2>学术日历地图</h2>
			<h2>-------------------</h2>
			<left-menu></left-menu>
		</div>
		<div class="top">
			<h1 style="color: #fff;">欢迎您，{{sendData}}</h1>
		</div>
		<div class="title" align="center">删除我的会议</div>
		<table class="uncheckList">
			<tr>
				<th>操作</th>
				<th>序号</th>
				<th>会议名称</th>
				<th>地点</th>
				<th>时间</th>
			</tr>
			<tr v-for="item in tableList">
				<td v-on:click="add" class="link">删除</td>
				<td>{{item.num}}</td>
				<td>{{item.meetingName}}</td>
				<td>{{item.address}}</td>
				<td>{{item.time}}</td>
			</tr>
		</table>
	</div>
</template>

<script>
	import LeftMenu from '@/components/LeftMenu';
	export default {
		props: ['sendData'],
		components: {
			'left-menu': LeftMenu
		},
		inject: ['reload'],
		data(){
			return {
				tableList: [],
				List: []
			}
		},
		async created() {
			this.tableList = await this.showList();
			
		},
		methods: {
			showList() {
				var tableList = [];
				return new Promise((resolve, reject) => {
					this.$axios.post(this.HOST + '/src/components/calendar_map/delM',{name:this.sendData})
						.then((response) => {
//							console.log(response)
							for(var i = 0; i < response.data.length; i++) {
								tableList.push(response.data[i]);
							}
							resolve(tableList);
						}).catch(function(error) {
							reject(error);
						})
				})
			},
			add(e){
				let num = e.currentTarget.nextElementSibling.innerText
				this.$axios.post(this.HOST + '/src/components/calendar_map/delM',{name:this.sendData,num:num})
				.then((response) => {
							if(response.data["msg"]=="删除成功"){
								alert("删除成功！");
								this.reload();
							}
							else{
								this.$message({
									message: '删除失败！',
									type: 'error',
									customClass: 'zZindex'
								});
							}
					}).catch(function(error) {
							reject(error);
						})
			}
		}
	}
</script>

<style>
	.left-menu {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		width: 210px;
		background: #545c64;
		color: #fff;
	}
	.title {
		margin-left: 210px;
		margin-bottom: 30px;
		font-size: 30px;
		font-weight: bold;
	}
	
	.top {
		position: fixed;
		left: 210px;
		top: 0;
		width: 86%;
		height: 50px;
		background: #545C64;
		text-align: center;
		z-index: 99999;
	}
	.uncheckList{ 
		/*margin: 0 auto;*/
		left: 210px;
		margin-left: 30%;
		border-collapse:collapse;
		border-spacing:0;
		border-left:1px solid #888;
		border-top:1px solid #888;
	}
	.link{
		color: dodgerblue;
		cursor: pointer;
		text-decoration: underline;
	}
	.uncheckList th,.uncheckList td{
		border-right:1px solid #888;
		border-bottom:1px solid #888;
		padding:5px 15px;
	}
</style>