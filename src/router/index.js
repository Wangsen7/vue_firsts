import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  }
  ]
})
// 先拿 路由对象 挂载 beforeEach对象 实现路由导航守卫，只有登录才能访问主页面。
router.beforeEach((to, from, next) => {
// to 将要访问的路径
// from 代表那个路径跳转而来
// next 是一个函数，表示放行
// next（） 放行 next('/login') 强制跳转

  if (to.path === '/login') return next()
  // 获取 token
  const tokenstr = window.sessionStorage.getItem('token')
  if (!tokenstr) return next('/login')
  next()
})

export default router
