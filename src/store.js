import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    patient: {},
  },
  mutations: {
    addFormData(state, data) {
      state.patient = data;
    }
  },
})

export default store;