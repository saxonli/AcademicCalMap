<template>
	<div id="app">
		<!--装载跳转后的路由内容-->
		<router-view v-if="isRouterAlive" @userPower="userPower":sendPower="power" @userSignIn="userSignIn":sendData="userName" ></router-view>
	</div>
</template>

<script>
	import 'element-ui/lib/theme-chalk/index.css';
	export default {
		name: 'App',
		provide(){
			return{
				reload:this.reload
			}
		},
		data() {
			return {
				isRouterAlive:true,
				userName: sessionStorage.userName,
				power: sessionStorage.power
			}
		},
		methods: {
			reload(){
				this.isRouterAlive=false
				this.$nextTick(function(){
					this.isRouterAlive=true
				})
			},
			userSignIn(userName) {
				sessionStorage.userName = userName;
				this.userName = sessionStorage.userName;
				console.log(this.userName)
			},
			userPower(power) {
				sessionStorage.power = power;
				this.power = sessionStorage.power;
				console.log(this.power)
			}
		}
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
	}
	
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>