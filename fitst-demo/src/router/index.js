import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/Home.vue'
const routes = [
  // 不同的路径展示不同的组件
  {
    path: "/",
    name: 'Home',
    component: Home
  },
  {
    path: "/about",
    name: 'About',
    // 异步加载路由：只有访问about页面才会加载about页面的代码；可以让访问页面更快
    component: () => import('../components/About.vue')
  },
  {
    path: "/vuex",
    name: 'Vuex',
    // 异步加载路由：只有访问about页面才会加载about页面的代码；可以让访问页面更快
    component: () => import('../components/CompositionVuex.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router