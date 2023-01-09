import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//路由是指根据url 的不同，展示不同的内容
createApp(App).use(store).use(router).mount('#app')
