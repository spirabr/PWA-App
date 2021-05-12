import Vue from 'vue';
import VueRouter from 'vue-router';
import NotFound from '../views/NotFound';
import Home from '../views/Home';
import About from '../views/About';
import Form from '../views/gather/Form';
import Aceite from '../views/gather/Aceite';
import Audios from '../views/gather/Audios';
import Done from '../views/gather/Done';
import Upload from '../views/Upload';

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
    path: '/gather/aceite',
    name: 'Aceite',
    component: Aceite
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
    path: '*',
    name: '404',
    component: NotFound
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
