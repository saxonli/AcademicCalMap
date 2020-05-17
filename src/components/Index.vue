<template>
	<div id="index">
		<div class="left-menu">
			<h2>学术日历地图</h2>
			<h2>-------------------</h2>
			<left-menu></left-menu>
		</div>
		<div class="right">
			<div class="top">
				<h1 style="color: #fff;">欢迎您，{{sendData}}</h1>
			</div>
			<div class="kmain">
				<k-main></k-main>
			</div>
		</div>
	</div>
</template>

<script>
	import LeftMenu from '@/components/LeftMenu';
	import 'element-ui/lib/theme-chalk/index.css';
	import KMain from '@/components/KMain';

	export default {
		name: 'Index',
		props: ['sendData'],
		components: {
			'left-menu': LeftMenu,
			'k-main': KMain
		}
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
	}
	
	#index {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
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
	
	.right {
		margin-left: 210px;
	}
	
	.top {
		position: fixed;
		top: 0;
		left: 210px;
		width: 86%;
		height: 50px;;
		background: #545C64;
		text-align: center;
	}
	
	.kmain {}
</style>