import Vue from 'vue'
import VueRouter from 'vue-router'
import TestAudio from '../views/TestAudio.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Form from '../views/gather/Form.vue'
import Accept from '../views/gather/Accept.vue'
import SusVowel from '../views/gather/SusVowel.vue'
import Parlend from '../views/gather/Parlend.vue'
import Phrase from '../views/gather/Phrase.vue'
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
    path: '/gather/accept',
    name: 'Accept',
    component: Accept
  },
  {
    path: '/gather/susvowel',
    name: 'SusVowel',
    component: SusVowel
  },
  {
    path: '/gather/parlend',
    name: 'Parlend',
    component: Parlend
  },
  {
    path: '/gather/phrase',
    name: 'Phrase',
    component: Phrase
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
