import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
// 'development',use package;'production':use cdn;
import ElementUI from 'element-ui'
Vue.use(ElementUI, { size: 'mini'});
import('element-ui/lib/theme-chalk/index.css')
import '@/permission' // permission control
import '@/mockjs'; // mock数据
// i18n国际化
import i18n from "@/lang";
// 分享功能集合
import { shareConfig } from './utils/share';
// 引入svg 所有文件
import './icons';
import { Message } from 'element-ui'

Vue.prototype.shareConfig = shareConfig;
Vue.prototype.$message = Message;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,  // 便于可以直接在组件中通过this.$i18n使用，也可以按需引用
  render: h => h(App),
}).$mount('#app')
