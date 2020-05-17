<template>	
	<el-row class="tac">
		<el-col :span="24">
			<el-menu default-active='' router class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
				<el-menu-item index="/login_register/Login">
						<i class="el-icon-menu"></i>
						<span slot="title">用户登录注册</span>
				</el-menu-item>
				<el-submenu index="日历地图显示">
					<template slot="title">
						<i class="el-icon-menu"></i>
						<span>日历地图显示</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/calendar_map/Calendar">学术会议日历</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group>
						<el-menu-item index="/calendar_map/addM">添加我的会议</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group>
						<el-menu-item index="/calendar_map/delM">删除我的会议</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group>
						<el-menu-item index="/calendar_map/Map">会议地图功能</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-menu-item index="/search/SearchKey">
					<i class="el-icon-menu"></i>
					<span slot="title">查询删除会议</span>
				</el-menu-item>
				<el-menu-item index="/insert/Insert">
					<i class="el-icon-menu"></i>
					<span slot="title">手工增录会议</span>
				</el-menu-item>
			</el-menu>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		name: "left-menu"
	}
</script>

<style scoped="">
	* {
		width: 210px;
	}
</style>