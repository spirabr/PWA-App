import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    patient: {},
  },
  mutations: {
    addFormData(state, data) {
      state.patient = data;
    }
  }
})

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
