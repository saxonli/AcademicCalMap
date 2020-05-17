// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'

Vue.prototype.HOST = 'http://localhost:3000'

//自己写的样式
import './style/theme.css'
import './style/characters.css'

Vue.prototype.$axios = Axios
Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(Vuex);
//Vue.use(Axios);
//Vue.use(VueAxios);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})