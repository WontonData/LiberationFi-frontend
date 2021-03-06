/*
 * @Author: OOO--li--OOO
 * @Date: 2021-09-04 22:05:26
 * @LastEditTime: 2021-09-12 16:27:38
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import 'normalize.css/normalize.css'
// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css';
import './assets/css/pro.less';
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.component(CollapseTransition.name, CollapseTransition)

store.commit("initContract");

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
