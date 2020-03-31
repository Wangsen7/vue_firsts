import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import less from 'less'
// 导入全局样式表
import './assets/css/global.css'
// 导入图标样式表font
import './assets/fonts/iconfont.css'
// 配置axios
import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios
// 配置请求拦截器
axios.interceptors.request.use(config => {
  // console.log(config)
  // 为请求头对象，添加token 验证的 Authorization 字段 保证拥有获取数据的权限
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.use(less)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
