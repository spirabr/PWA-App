import Vuex from 'vuex';
import Vue from 'vue';
import { openDB } from 'idb';

Vue.use(Vuex);

// Opening IndexedDB in here... Should I?
openDB('local', undefined, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('patients')) {
      db.createObjectStore('patients', {autoIncrement: true});
    }
  }
});

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
      const audios = Object.keys(state.patient).map(key => {
          if (key != 'form')
            return new Promise(() => {
              fetch(state.patient[key])
                .then(preBlob => preBlob.blob())
                .then(blob => new File([blob], key, { type: "audio/wav" } ));
            })
        });
      console.log(await Promise.all(audios));

      const db = await openDB('local');
      const transaction = db.transaction(['patients'], 'readwrite');
      const store = transaction.objectStore('patients');
      store.add(state.patient);
      
      return transaction.complete;
    }
  },
})

export default store;