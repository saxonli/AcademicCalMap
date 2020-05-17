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
		<div class="title" align="center">查询会议信息</div>
		<div class="searchkey">
			<div class="tab">
				<el-row>
					<el-col :span="1" class="grid1">
						<el-input v-model="search" placeholder="请输入搜索的会议名称" id="myInput">
						</el-input>
					</el-col>
					<el-col :span="2" class="grid2">
						<el-button type="success" icon="el-icon-search" @click="handleSearch()">搜索</el-button>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="1" class="grid1">
						<el-input v-model="deleteName" placeholder="请输入欲删除的会议名称" id="myInput">
						</el-input>
					</el-col>
					<el-col :span="2" class="grid2">
						<el-button type="danger" icon="el-icon-upload" @click="deleteMeeting()">删除会议</el-button>
					</el-col>
				</el-row>
				<el-table :data="List" border style="width: 80%" id="myTable">
					<!--<el-table-column prop="num" label="序号" width="50">
					</el-table-column>-->
					<el-table-column prop="meetingName" label="会议名称" width="410">
					</el-table-column>
					<el-table-column prop="address" label="地点">
					</el-table-column>
					<el-table-column prop="time" label="时间">
					</el-table-column>
					<!--<el-table-column prop="function" label="功能">
						<el-button type="primary" icon="el-icon-edit" @click="handleSearch()"></el-button>
						<el-button type="danger" icon="el-icon-delete" @click="handleSearch()"></el-button>
					</el-table-column>-->
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
	import LeftMenu from '@/components/LeftMenu';
	export default {
		inject: ['reload'],
		name: "search-key",
		props: ['sendData', 'sendPower'],
		components: {
			'left-menu': LeftMenu
		},
		data() {
			return {
				tableList: [],
				List: [],
				search: '',
				msg: '',
				deleteName: ''
			}
		},
		async created() {
			this.tableList = await this.showList();
			this.List = this.tableList[0];
		},
		methods: {
			showList() {
//				this.$emit('alive', "/search/SearchKey");
				var tableList = [];
				return new Promise((resolve, reject) => {
					this.$axios.get(this.HOST + '/src/components/search/SearchKey')
						.then((response) => {
							console.log(response)
							for(var i = 0; i < response.data.length; i++) {
								tableList.push(response.data);
							}
							resolve(tableList);
						}).catch(function(error) {
							reject(error);
						})
				})
			},
			handleSearch() {
				//console.log(this.tableList[0][0])
				var keysearch = this.search;
				var list = this.tableList[0];
				//console.log(list)
				keysearch = keysearch.trim().toUpperCase();
				var searchlist = this.tableList[0].filter(item => {
					if(item.meetingName.includes(keysearch)) {
						return item;
					}
				});
				if(searchlist.length) {
					list = searchlist;
				} else {
					alert('未搜索到有关会议');
				}
				this.List = list;
				console.log(this.List);
			},
			deleteMeeting() {
				var meetingName;
				if(this.sendPower == "Y") {
					if(!this.deleteName) {
						this.$message({
							message: '请输入欲删除的会议名称',
							type: 'error',
							customClass: 'zZindex'
						});
						return;
					}
					this.$axios.post(this.HOST + '/src/components/search/SearchKey', {
							meetingName: this.deleteName
						})
						.then(result => {
							console.log(result.data)
							this.msg = result.data.msg
							if(this.msg == '删除失败，查无此会议') {
								this.$message({
									message: '删除失败，查无此会议',
									type: 'error',
									customClass: 'zZindex'
								});
							} else if(this.msg == '删除成功') {
								alert('删除成功')
								this.reload() //							this.$router.push("/search/SearchKey")
							} else if(this.msg == '删除失败') {
								this.$message({
									message: '删除失败',
									type: 'error',
									customClass: 'zZindex'
								});
							}
						})
						.catch(err => {
							console.log(err)
						})
				} else {
					this.$message({
						message: '非管理员身份，不具有删除会议权限',
						type: 'error',
						customClass: 'zZindex'
					});
				}

			}
		}
	}
</script>

<style type="text/css">
	.title {
		margin-left: 210px;
		margin-bottom: 30px;
		font-size: 30px;
		font-weight: bold;
	}
	
	.left-menu {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		width: 210px;
		background: #545c64;
		color: #fff;
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
	
	.searchkey {
		margin-left: 210px;
	}
	
	.tab {
		margin-left: 15%;
	}
	
	.grid1 {
		width: 70%;
		margin-bottom: 10px;
		margin-right: 5px;
	}
	
	.grid2 {
		margin-bottom: 10px;
		margin-right: 13px;
	}
	
	.zZindex {
		z-index: 100000 !important;
	}
</style>