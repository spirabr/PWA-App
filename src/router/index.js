import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Accept from '../views/Accept.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/accept',
    name: 'Accept',
    component: Accept
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
