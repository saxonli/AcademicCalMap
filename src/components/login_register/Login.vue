<template>
	<div>
		<div class="login_form">
			<span><h1>学术日历地图网站</h1></span><br/>
			<span><h3>用户登录</h3></span><br/>
			<input type="text" class="qxs-ic_user qxs-icon" placeholder="请输入用户名" v-model="userName">
			<input type="password" class="qxs-ic_password qxs-icon" placeholder="请输入密码" v-model="password">
			<div style="margin-top: 10px">
				<div align="center">
					<el-button class="login_btn" @click.native="login" type="primary" round :loading="isBtnLoading">登录</el-button>
				</div>
				<span style="float: right; color: #000090;" @click="register">立即注册>></span>
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
					password: '',
					power: '',
					msg: '',
					isBtnLoading: false
				}
			},
			methods: {
				login() {
					if(!this.userName) {
						this.$message({
							message: '请输入用户名',
							type: 'error',
							customClass: 'zZindex'
						});
						return;
					}
					if(!this.password) {
						this.$message({
							message: '请输入密码',
							type: 'error',
							customClass: 'zZindex'
						});
						return;
					}

					this.$axios.post(this.HOST + '/src/components/login_register/Login', {
							username: this.userName,
							password: this.password,
						})
						.then(result => {
							console.log(result.data)
							this.msg = result.data.msg
							if(this.msg == '登录失败') {
								this.$message({
									message: '登录失败',
									type: 'error',
									customClass: 'zZindex'
								});
							} else if(this.msg == '登录成功') {
								this.power = result.data.power
								alert('登录成功')
								this.$emit('userSignIn', this.userName)
								this.$emit('userPower', this.power)
								this.$router.push("/Index")
							} else if(this.msg == '密码错误') {
								this.$message({
									message: '密码错误',
									type: 'error',
									customClass: 'zZindex'
								});
							}
						})
						.catch(err => {
							console.log(err)
						})
				},
				register() {
					this.$router.push({
						path: '/login_register/Register'
					})
				}
			}
	}
</script>
<style>
	.login_form {
		padding-top: 10%;
		padding-left: 10%;
		padding-right: 10%;
	}
	
	.qxs-ic_user {
		background-size: 13px 15px;
		background-position: 3%;
	}
	
	.qxs-ic_password {
		background-size: 13px 15px;
		background-position: 3%;
		margin-bottom: 20px;
	}
	
	.login_btn {
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