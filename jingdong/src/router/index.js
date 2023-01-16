import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/Home'
import Login from '../views/login/Login'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    // beforeEnter这个函数会在你进入到路由之前执行 
    beforeEnter(to, from, next) {
      const { isLogin } = localStorage;
      isLogin ? next({ name: 'Home' }) : next()
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// beforeEach：在路由每次做切换的时候执行
// to：你要跳转到那个页面的信息
// from：你从哪里跳过来的信息
router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage
  if (isLogin || to.name === 'Login') {
    next()  // 调用next让你正常往下执行 
  } else {
    next({ name: 'Login' })
  }
})

export default router
