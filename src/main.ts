import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store.js'
import router from './router'
import vuetify from './plugins/vuetify';
import VueMask from 'v-mask';

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app');
