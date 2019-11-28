// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router'
import VueRouter from 'vue-router'
// Vue.prototype.$axios = axios
Vue.config.productionTip = false
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import axios from '@/axios';
import wechat from '@/wechat';
import wxconfig from '@/wxconfig/index';
import http from '@/request/http';
Vue.use(ViewUI);
Vue.use(VueRouter);
// Vue.prototype.$axios = axios;
Vue.prototype.$http = http;
Vue.prototype.$WxJs = wechat;
const router = new VueRouter({
		mode: 'history',
		routes:routes
});
import store from './store'
import storage from '@/storage'
Vue.prototype.$storage = storage;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
