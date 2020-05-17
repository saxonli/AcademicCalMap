import Vue from 'vue'
import Router from 'vue-router'
import SearchKey from '@/components/search/SearchKey'
import Login from '@/components/login_register/Login'
import Register from '@/components/login_register/Register'
import Map from '@/components/calendar_map/Map'
import Index from '@/components/Index'
import Calendar from '@/components/calendar_map/Calendar'
import Insert from '@/components/insert/Insert'
import addM from '@/components/calendar_map/addM'
import delM from '@/components/calendar_map/delM'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			redirect: 'login_register/Login'
		},

		{
			path: '/login_register/Login',
			name: 'Login',
			component: Login
		},

		{
			path: '/login_register/Register',
			name: 'Register',
			component: Register
		},

		{
			path: '/calendar_map/Map',
			name: 'Map',
			component: Map
		},

		{
			path: '/search/SearchKey',
			name: 'SearchKey',
			component: SearchKey
		},

		{
			path: '/Index',
			name: 'Index',
			component: Index
		},

		{
			path: '/calendar_map/Calendar',
			name: 'Calendar',
			component: Calendar

		},

		{
			path: '/insert/Insert',
			name: 'Insert',
			component: Insert
		}, 
		
		{
			path: '/calendar_map/addM',
			name: 'addM',
			component: addM

		},
		
		{
			path: '/calendar_map/delM',
			name: 'delM',
			component: delM

		}
	]
})