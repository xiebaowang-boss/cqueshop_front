import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import global from './components/util/Global'
import {formatDate} from "@/components/util/formatDate";
import '../static/css/reset.css'

axios.defaults.baseURL = 'http://localhost:8888/shop'
Vue.config.productionTip = false
Vue.filter('formatDate',formatDate)
Vue.prototype.$GLOBAL = global
Vue.use(ElementUI)
Vue.use(VueAxios, axios)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
