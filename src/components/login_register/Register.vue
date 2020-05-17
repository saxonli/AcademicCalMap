<template>
	<div>
		<div class="register_form">
			<span><h1>学术日历地图网站</h1></span><br/>
			<span><h3>用户注册</h3></span><br/>
			<input type="text" class="qxs-ic_user qxs-icon" placeholder="请输入用户名（3-10个字符,必须以字母开头,不允许包含除了下划线之外的特殊字符）" v-model="userName">
			<input type="password" class="qxs-ic_password1 qxs-icon" placeholder="请输入密码（6-20个字符,密码必须包含至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符）" v-model="password1">
			<input type="password" class="qxs-ic_password2 qxs-icon" placeholder="请输入再次密码（注意前后一致）" v-model="password2">
			<div style="margin-top: 10px">
				<div align="center">
					<el-button class="register_btn" @click="register" type="primary" round :loading="isBtnLoading">注册</el-button>
				</div>
				<span style="float: right; color: #000090;" @click="login">返回登录>></span>
			</div>
			<!--<div>{{msg}}</div>-->
		</div>
	</div>
</template>

<script>
	export default {
		data() {
				return {
					userName: '',
					password1: '',
					password2: '',
					msg: '',
					isBtnLoading: false
				}
			},

			methods: {
				register() {
					if(this.userName == "" || this.password1 == "" || this.password2 == "") {
						this.$message({
							message: '请输入用户名或密码',
							type: 'error',
							customClass: 'zZindex'
						});
					} else if(!this.userName.match(/^[a-zA-Z][a-zA-Z0-9_\u4e00-\u9fa5]{2,9}$/)) {
						this.$message({
							message: '请检查用户名是否合规',
							type: 'error',
							customClass: 'zZindex'
						});
					} else if(!this.password1.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{6,20}$/)) {
						this.$message({
							message: '请检查密码是否合规',
							type: 'error',
							customClass: 'zZindex'
						});
					} else if(this.password1 != this.password2) {
						this.$message({
							message: '前后两次密码不一致',
							type: 'error',
							customClass: 'zZindex'
						});
					} else {
						this.$axios.post(this.HOST + '/src/components/login_register/Register', {
								username: this.userName,
								password: this.password1
							})
							.then(result => {
								console.log(result.data)
								this.msg = result.data.msg
								if(this.msg == '用户名已存在') {
									this.$message({
										message: '用户名已存在',
										type: 'error',
										customClass: 'zZindex'
									});
								}else if(this.msg == '注册失败') {
									this.$message({
										message: '注册失败',
										type: 'error',
										customClass: 'zZindex'
									});
								}else if(this.msg == '注册成功') {
									alert('注册成功');
									this.$router.push("/login_register/Login");
								}
							})
							.catch(err => {
								console.log(err)
							})
					}
				},

				login() {
					this.$router.push({
						path: '/login_register/Login'
					})
				}
			}
	}
</script>
<style>
	.register_form {
		padding-top: 8%;
		padding-left: 10%;
		padding-right: 10%;
	}
	
	.qxs-ic_user {
		background-size: 13px 15px;
		background-position: 3%;
	}
	
	.qxs-ic_password1 {
		background-size: 13px 15px;
		background-position: 3%;
	}
	
	.qxs-ic_password2 {
		background-size: 13px 15px;
		background-position: 3%;
		margin-bottom: 20px;
	}
	
	.register_btn {
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