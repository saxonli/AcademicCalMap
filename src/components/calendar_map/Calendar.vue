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
		<div class="title" align="center">学术会议日历</div>
		<div id="box">
			<div id="calendar" v-if="pickDay != null">
				<!-- 年份 月份 -->
				<div class="month">
					<ul>
						<li class="arrow" @click="pickPre(currentYear,currentMonth)">
							<</li>
								<li class="year-month" @click="pickYear(currentYear,currentMonth)">
									<span class="choose-year">{{ currentYear }}</span>
									<span class="choose-month"> - {{ currentMonth }}</span>
								</li>
								<li class="arrow" @click="pickNext(currentYear,currentMonth)">></li>
					</ul>
				</div>
				<!-- 星期 -->
				<ul class="weekdays">
					<li>MO</li>
					<li>TU</li>
					<li>WE</li>
					<li>TH</li>
					<li>FR</li>
					<li style="color:red">SA</li>
					<li style="color:red">SU</li>
				</ul>
				<!-- 日期 -->
				<ul class="days">
					<li v-for="day in days">
						<!--本月-->
						<span v-if="day.day.getMonth()+1 != currentMonth" class="other-month">
     	<span>{{ day.day.getDate() }}</span><br><br>
						<span id="cont" v-for="memo in day.memo_cont" v-on:click="show"><span class="circle"></span>{{memo}}<br></span>
						</span>
						<span v-else>
      <!--今天-->
      <span v-if="day.day.getFullYear() == new Date().getFullYear() && day.day.getMonth() == new Date().getMonth() && day.day.getDate() == new Date().getDate()" class="active">
      	<span>{{ day.day.getDate() }}</span><br><br>
						<span id="cont" v-for="memo in day.memo_cont" v-on:click="show"><span class="circle"></span>{{memo}}<br></span>
						</span>
						<span v-else>
      	<span>{{ day.day.getDate() }}</span><br><br>
						<span id="cont" v-for="memo in day.memo_cont" v-on:click="show"><span class="circle"></span>{{memo}}<br></span>
						</span>

						</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import LeftMenu from '@/components/LeftMenu';
	export default {
		props: ['sendData'],
		components: {
			'left-menu': LeftMenu
		},
		data() {
			return {
				currentDay: 1,
				currentMonth: 1,
				currentYear: 1970,
				currentWeek: 1,
				days: [],
				memo_list: [],
				pickDay: null,
				currentMemo: null
					//		  memo_list : []//时间格式必须为xxxx-xx-xx;这里用数据库查询！
			};
		},
		async created() {
//			console.log(sessionStorage.userName);
			this.memo_list = await this.show_list();
			this.initCalendar(null);
		},
		methods: {
			async show(ev) {
				var key_name = ev.target.innerText;
				var response;
				try{
					response = await this.$axios.post(this.HOST + '/src/components/calendar_map/Calendar',{"c_name":key_name})
				}catch(error){
					reject(error);
				}
				let c_addr = response.data[0]['address']
				let str = key_name+'\n地点：'+c_addr;
				alert(str);
			},
			show_list() {
				var memo_list = [];
				return new Promise((resolve, reject) => {
					this.$axios.post(this.HOST + '/src/components/calendar_map/Calendar',{"name":this.sendData})
						.then((response) => {
//							console.log(response)
							for(var i = 0; i < response.data.length; i++) {
								memo_list.push(response.data[i]['time']);
							}
//							console.log(memo_list)
							resolve(memo_list);
						}).catch(function(error) {
							reject(error);
						})
				})

			},
			get_things(day) {
				var mem_list = [];
				return new Promise((resolve, reject) => {
					this.$axios.post(this.HOST + '/src/components/calendar_map/Calendar', {
							"c_date": day,
							"name": this.sendData
						})
						.then((response) => {
							for(var i = 0; i < response.data.length; i++) {
								mem_list[i] = response.data[i]["meetingName"];
							}
							resolve(mem_list);
//							console.log(mem_list);
						}).catch(function(error) {
							reject(error);
						})
				})
			},
			async initCalendar(cur) {
				if(cur) {
					var date = new Date(cur);
				} else {
					var date = new Date();
					this.pickDay = date.getDate();
				}
				this.currentYear = date.getFullYear();
				this.currentMonth = date.getMonth() + 1;
				var str = this.formatDate(this.currentYear, this.currentMonth, 1);
				this.currentWeek = new Date(str).getDay() == 0 ? 7 : new Date(str).getDay();
				this.days.length = 0; //初始化数组
				for(var i = this.currentWeek - 1; i >= 0; i--) {
					var d = new Date(str);
					var memo_cont = null;
					d.setDate(d.getDate() - i);
					var dat = this.formatDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
					//	      console.log(dat);
					if(this.memo_list.includes(dat)) {
						memo_cont = await this.get_things(dat);
					}
					this.days.push({
						day: d,
						memo_cont: memo_cont
					});
				}
				for(var i = 1; i <= 35 - this.currentWeek; i++) {
					var d = new Date(str);
					d.setDate(d.getDate() + i);
					//	      console.log(d);
					var memo_cont = null;
					let dat = this.formatDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
					if(this.memo_list.includes(dat)) {
						memo_cont = await this.get_things(dat);
					}
					this.days.push({
						day: d,
						memo_cont: memo_cont
					});
				}

			},
			pickPre(year, month) {
				// setDate(0); 上月最后一天
				// setDate(-1); 上月倒数第二天
				// setDate(dx) 参数dx为 上月最后一天的前后dx天
				var d = new Date(this.formatDate(year, month, 1));
				d.setDate(0);
				this.initCalendar(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
			},
			pickNext(year, month) {
				var d = new Date(this.formatDate(year, month, 1));
				d.setDate(35);
				this.initCalendar(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
			},
			// 返回 类似 2016-01-02 格式的字符串
			formatDate(year, month, day) {
				var y = year;
				var m = month;
				if(m < 10) m = "0" + m;
				var d = day;
				if(d < 10) d = "0" + d;
				return y + "-" + m + "-" + d;
			}
		}
	}
</script>
<style type="text/css">
	#box {
		width: 469px;
	}
	/*日历*/
	
	* {
		padding: 0;
		margin: 0;
	}
	
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
		height: 50px;;
		background: #545C64;
		text-align: center;
		z-index: 99999;
	}
	
	li {
		list-style: none;
	}
	
	#calendar {
		width: 380px;
		margin: 40px auto 0;
		padding-bottom: 30px;
		border-bottom: 1px solid #eee;
		margin-left: 350px;
	}
	
	#cont {
		font-size: 8px;
		font-family:"幼圆";
		line-height: 10px;
		float: left;
	}
	
	.month {
		width: 860px;
	}
	
	.month ul {
		margin: 29px 0 25px;
		display: flex;
		justify-content: center;
	}
	
	.year-month {
		width: 860px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.choose-year {
		font-size: 18px;
		color: #989898;
	}
	
	.choose-month {
		text-align: center;
		color: #989898;
		font-size: 18px;
	}
	
	.arrow {
		width: 28px;
		height: 28px;
		text-align: center;
	}
	
	.arrow:hover {
		background: rgba(100, 2, 12, 0.1);
		cursor: pointer;
	}
	
	.month ul li {
		color: #789AF7;
		font-size: 20px;
	}
	
	.weekdays {
		width: 900px;
		margin: 0 auto 7.5px;
		display: flex;
		flex-wrap: wrap;
		color: #808080;
		justify-content: space-around;
	}
	
	.weekdays li {
		display: inline-block;
		font-size: 16px;
		color: #808080;
		width: 123px;
		text-align: center;
	}
	
	.days {
		width: 900px;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		background: #FFFFFF;
	}
	
	.days li {
		font-size: 14px;
		height: 100px;
		width: 123px;
		border: 2px solid green;
		border-top-width: 5px;
		position: relative;
		display: inline-block;
		text-align: center;
		padding-bottom: 7.5px;
		padding-top: 7.5px;
		color: #999;
		cursor: pointer;
		line-height: 9px;
	}
	
	.days li .active {
		color: #789AF7;
	}
	
	.days li .other-month {
		padding: 5px;
		color: #E6E6E6;
	}
	
	.days li:hover {
		color: #789AF7;
	}
	
	.days li:hover .other-month {
		color: #789AF7;
	}
	
	.circle {
		display: inline-block;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: #7699F8;
		vertical-align: top;
		margin: 5px 2px 0px 3px;
	}
</style>