import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from "./store";

import lazyLoad from 'vue-lazyload';
import fastClick from 'fastclick';

import Toast from "components/content/toast";

Vue.config.productionTip = false;

//事务总线：非父子通行/辈分相差很远时，可用,用法:this.$bus.$on/this.$bus.$emit;
Vue.prototype.$bus = new Vue();

//使用fastClick库，取消服务器对双击的300ms延迟的判断
fastClick.attach(document.body);

//图片懒加载，使用时需要修改img元素的属性src -> v-lazy
Vue.use(lazyLoad);

Vue.use(Toast);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
