import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Reading from './views/Reading.vue'
import Configuration from './views/Configuration.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/reading', component: Reading },
    { path: '/configuration', component: Configuration }
  ]
})

createApp(App).use(router).mount('#app')