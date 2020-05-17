<template>
	<div class="top">
		<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
			<el-menu-item index="1">登录</el-menu-item>
			<el-menu-item index="2">注册</el-menu-item>
			<el-menu-item disabled>{{sendData}}</el-menu-item>
		</el-menu>
	</div>
</template>
<script>
	export default {
		name: "ktop",
		props: ['sendData'],
		data() {
			return {
				activeIndex: '1',
				activeIndex2: '1'
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
				console.log(sendData);
			}
		}
	}
</script>
<style scoped>
	.top{
		position: fixed;
		top:0;
		width: 100%;
	}
</style>