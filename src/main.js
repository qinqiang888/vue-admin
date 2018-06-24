// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Cookie from 'js-cookie'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/less/style.less';
import '@/utils/rem.js'
import fetch from '@/utils/fetch.js'
Vue.use(ElementUI);
Vue.prototype.$fetch = fetch;
Vue.prototype.$Cookie = Cookie;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
