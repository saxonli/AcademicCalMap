<template>
	<div>
		<div class="register_form">
			<span><h1>学术日历地图网站</h1></span><br/>
			<span><h3>用户注册</h3></span><br/>
			<input type="text" class="qxs-ic_user qxs-icon" placeholder="请输入用户名（不超过10个字符）" v-model="userName">
			<input type="password" class="qxs-ic_password1 qxs-icon" placeholder="请输入密码（不超过20个字符）" v-model="password1">
			<input type="password" class="qxs-ic_password2 qxs-icon" placeholder="请输入再次密码（注意前后一致）" v-model="password2">
			<div style="margin-top: 10px">
				<div align="center"><el-button class="register_btn" @click="register" type="primary" round :loading="isBtnLoading">注册</el-button></div>
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
//					msg: '',
					isBtnLoading: false
				}
			},

			methods: {
				register() {
					if(this.userName == "" || this.password1 == "" || this.password2 == "") {
						this.$message.error('请输入用户名或密码');
					} else if(this.password1 != this.password2) {
						this.$message.error('前后两次密码不一致');
					} else {
						this.$axios.post(this.HOST + '/src/components/login_register/Register', {
								username: this.userName,
								password: this.password1
							})
//							.then(result => {
//								console.log(result.data)
//								this.msg = result.data.msg
//							})
							.catch(err => {
								console.log(err)
							})
						alert('注册成功');
						this.$router.push("/login_register/Login")
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
</style>