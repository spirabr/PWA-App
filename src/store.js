import Vuex from 'vuex';
import Vue from 'vue';
import { openDB } from 'idb';

Vue.use(Vuex);

// Opening IndexedDB in here... Should I?
openDB('local', undefined, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('patients')) {
      let objectStore = db.createObjectStore('patients', {keyPath: 'id'});
      objectStore.createIndex('patientId', 'id', {unique: false})
    }
  }
});

const store = new Vuex.Store({
  state: {
    patient: {
      id: null,
      form: null,
      aceite: null,
      sustentada: null,
      parlenda: null,
      frase: null,
    },
  },
  getters: {
    allPatients: async (state, getters) => {
      const db = await openDB('local');
      const transaction = db.transaction(['patients'], 'readwrite');
      const store = transaction.objectStore('patients');
      const result = await store.getAll()
      return result
    }
  },
  mutations: {
    addFormData(state, data) {
      //TODO: Think of a better way define ID? RGH-only is not unique
      state.patient.id = `${data.local}_${data.rgh}`
      state.patient.form = data;
    },
    saveTermo(state, blobURL) {
      state.patient.aceite = blobURL;
    },
    saveSustentada(state, blobURL) {
      state.patient.sustentada = blobURL;
    },
    saveParlenda(state, blobURL) {
      state.patient.parlenda = blobURL;
    },
    saveFrase(state, blobURL) {
      state.patient.frase = blobURL;
    },
    async persistData(state) {
      for (let field in state.patient) {
        if (field !== 'form' && field !== 'id') {
          const preBlob = await fetch(state.patient[field]);
          const blob = await preBlob.blob();
          state.patient[field] = new File([blob], field, { type: "audio/wav" } );
          console.log(state.patient[field]);
        }
      }
      const db = await openDB('local');
      const transaction = db.transaction(['patients'], 'readwrite');
      const store = transaction.objectStore('patients');
      store.add(state.patient);
      
      return transaction.complete;
    }
  },
})

export default store;