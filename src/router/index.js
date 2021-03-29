import Vue from 'vue'
import VueRouter from 'vue-router'
import TestAudio from '../views/TestAudio.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Form from '../views/gather/Form'
import Audios from '../views/gather/Audios'
import Done from '../views/gather/Done.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/gather/form',
    name: 'Form',
    component: Form
  },
  {
    path: '/gather/audios',
    name: 'Audios',
    component: Audios
  },
  {
    path: '/gather/done',
    name: 'Done',
    component: Done
  },
  {
    path: '/test',
    name: 'TestAudio',
    component: TestAudio
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
