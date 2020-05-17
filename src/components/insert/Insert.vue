<template>
	<div>
		<div class="left-menu">
			<h2>学术日历地图</h2>
			<h2>-------------------</h2>
			<left-menu></left-menu>
		</div>
		<div class="title" align="center">人工增录会议</div>
		<div class="insert_form">
			<el-input type="varchar" class="qxs-ic_meetingName" placeholder="请输入会议名称" v-model="meetingName" clearable>
			</el-input>
			<el-input type="varchar" class="qxs-ic_address" placeholder="请输入会议地点" v-model="address" clearable>
			</el-input>
			<el-input type="char" class="qxs-ic_time" placeholder="请输入会议时间（格式举例：2020-01-01）" v-model="time" clearable>
			</el-input>
			<div style="margin-top: 10px">
				<div align="center">
					<el-button class="insert_btn" @click.native="insert" type="primary" round :loading="isBtnLoading">添加会议</el-button>
				</div>
			</div>
			<!--<div>{{msg}}</div>-->
		</div>
	</div>
</template>

<script>
	import LeftMenu from '@/components/LeftMenu';
	export default {
		components: {
			'left-menu': LeftMenu
		},
		data() {
			return {
				meetingName: '',
				address: '',
				time: '',
				isBtnLoading: false
			}
		},
		methods: {
			insert() {
				if(this.meetingName == "") {
					this.$message.error('请输入会议名称');
				} else if(this.address == "") {
					this.$message.error('请输入会议地点');
				} else if(this.time == "") {
					this.$message.error('请输入会议时间');
				} else {
					this.$axios.post(this.HOST + '/src/components/insert/Insert', {
							meetingName: this.meetingName,
							address: this.address,
							time: this.time
						})
						//							.then(result => {
						//								console.log(result.data)
						//								this.msg = result.data.msg
						//							})
						.catch(err => {
							console.log(err)
						})
					alert('添加成功');
					this.$router.push("/insert/Insert")
				}
			}

		}
	}
</script>

<style>
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
	
	.insert_form {
		margin-left: 210px;
		padding-top: 5%;
		padding-left: 10%;
		padding-right: 10%;
	}
	
	.qxs-ic_meetingName {
		background-size: 13px 15px;
		background-position: 3%;
		margin-bottom: 5px;
	}
	
	.qxs-ic_address {
		background-size: 13px 15px;
		background-position: 3%;
		margin-bottom: 5px;
	}
	
	.qxs-ic_time {
		background-size: 13px 15px;
		background-position: 3%;
		margin-bottom: 20px;
	}
	
	.insert_btn {
		width: 30%;
		font-size: 16px;
		background: -webkit-linear-gradient(left, #000099, #2154FA);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(right, #000099, #2154FA);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(right, #000099, #2154FA);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to right, #000099, #2154FA);
		/* 标准的语法 */
		filter: brightness(1.4);
	}
</style>