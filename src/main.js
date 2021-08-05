import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import ElementPlus from 'element-plus';
// import 'element-plus/lib/theme-chalk/index.css';

Vue.config.productionTip = false
// Vue.use(ElementPlus);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
