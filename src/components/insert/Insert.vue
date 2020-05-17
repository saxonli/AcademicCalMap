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
		<div class="title" align="center">人工增录会议</div>
		<div class="insert_form" align="left">
			<div class="input_form">
				<span class="txt_meetingName">会议名称：</span>
				<el-input type="varchar" class="qxs-ic_meetingName" placeholder="请输入会议名称" v-model="meetingName" clearable>
				</el-input>
			</div>

			<div class="input_form">
				<span class="txt_address">会议地点：</span>
				<el-input type="varchar" class="qxs-ic_address" placeholder="请输入会议地点" v-model="address" clearable>
				</el-input>
			</div>

			<div class="input_form">
				<span class="txt_time">会议时间：</span>
				<el-date-picker v-model="time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"> 
				</el-date-picker>  
			</div>
			<div style="margin-top: 10px">
				<div align="center">
					<el-button class="insert_btn" @click.native="insert" type="primary" round :loading="isBtnLoading">添加会议</el-button>
				</div>
			</div>
			<!--<div>{{sendPower}}</div>-->
		</div>
	</div>
</template>

<script>
	import LeftMenu from '@/components/LeftMenu';
	export default {
		inject: ['reload'],
		props: ['sendData', 'sendPower'],
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
				if(this.sendPower == "Y") {
					if(this.meetingName == "") {
						this.$message({
							message: '请输入会议名称',
							type: 'error',
							customClass: 'zZindex'
						});
					} else if(this.address == "") {
						this.$message({
							message: '请输入会议地点',
							type: 'error',
							customClass: 'zZindex'
						});
					} else if(this.time == "") {
						this.$message({
							message: '请输入会议时间',
							type: 'error',
							customClass: 'zZindex'
						});
					} else {
						this.$axios.post(this.HOST + '/src/components/insert/Insert', {
								meetingName: this.meetingName,
								address: this.address,
								time: this.time
							})
							.then(result => {
								console.log(result.data)
								this.msg = result.data.msg
								if(this.msg == '会议已存在') {
									this.$message({
										message: '会议已存在',
										type: 'error',
										customClass: 'zZindex'
									});
								} else if(this.msg == '添加失败') {
									this.$message({
										message: '添加失败',
										type: 'error',
										customClass: 'zZindex'
									});
								} else if(this.msg == '添加成功') {
									alert('添加成功');
									this.reload();
								}
							})
							.catch(err => {
								console.log(err)
							})
					}
				} else {
					this.$message({
						message: '非管理员身份，不具有插入会议权限',
						type: 'error',
						customClass: 'zZindex'
					});
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
	
	.insert_form {
		margin-left: 210px;
		padding-top: 5%;
		padding-left: 10%;
		padding-right: 10%;
	}
	
	.input_form {
		display: block;
		width: 100%;
		margin-bottom: 10px;
	}
	
	.qxs-ic_meetingName {
		background-size: 13px 15px;
		background-position: 3%;
		margin-bottom: 5px;
		float: left;
		width: 90%;
	}
	
	.qxs-ic_address {
		background-size: 13px 15px;
		background-position: 3%;
		margin-bottom: 5px;
		float: left;
		width: 90%;
	}
	
	.qxs-ic_time {
		background-size: 13px 15px;
		background-position: 3%;
		margin-bottom: 20px;
		float: left;
		width: 90%;
	}
	
	.txt_meetingName {
		width: 80px;
		float: left;
		line-height: 40px;
		width: 10%;
	}
	
	.txt_address {
		width: 80px;
		float: left;
		line-height: 40px;
		width: 10%;
	}
	
	.txt_time {
		width: 80px;
		float: left;
		line-height: 40px;
		width: 10%;
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
	
	.zZindex {
		z-index: 100000 !important;
	}
</style>