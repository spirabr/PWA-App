import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    patient: {
      form: undefined,
      aceite: undefined,
      sustentada: undefined,
      parlenda: undefined,
      frase: undefined,
    },
  },
  mutations: {
    addFormData(state, data) {
      state.patient.form = data;
      console.log(this.state.patient.form);
    },
    saveTermo(state, blobURL) {
      state.patient.aceite = blobURL;
      console.log(this.state.patient);
    },
    saveSustentada(state, blobURL) {
      state.patient.sustentada = blobURL;
      console.log(this.state.patient);
    },
    saveParlenda(state, blobURL) {
      state.patient.parlenda = blobURL;
      console.log(this.state.patient);
    },
    saveFrase(state, blobURL) {
      state.patient.frase = blobURL;
      console.log(this.state.patient);
    },
    async persistData(state) {
      await indexedDB.open();
    }
  },
})

export default store;