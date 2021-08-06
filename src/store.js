import Vuex from 'vuex';
import Vue from 'vue';
import { openDB } from 'idb';

Vue.use(Vuex);

openDB('local', undefined, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('patients')) {
      let objectStore = db.createObjectStore('patients', {keyPath: 'id'});
      objectStore.createIndex('patientId', 'id', {unique: false});
    }
    if (!db.objectStoreNames.contains('hospitals')) {
      let objectStore = db.createObjectStore('hospitals', {keyPath: 'id'});
      objectStore.createIndex('hospitalId', 'id');
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
    hospitals: [],
  },
  getters: {
    async allPatients() {
      const { store } = await openStore('patients');
      const result = await store.getAll();
      return result;
    },
    async getHospitals(state) {
      if (state.hospitals.length <= 0) {
        const { store } = await openStore('hospitals');
        state.hospitals = await store.get(0) || ['Hospital das clínicas'];
      }
      return state.hospitals;
    },
  },
  mutations: {
    addFormData(state, data) {
      //TODO: Think of a better way define ID? RGH-only is not unique
      state.patient.id = `${data.local}_${data.rgh}`;
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
      console.log(state.patient);
      for (let field in state.patient) {
        if (field !== 'form' && field !== 'id') {
          const preBlob = await fetch(state.patient[field]);
          const blob = await preBlob.blob();
          state.patient[field] = new File([blob], field, { type: "audio/wav" } );
        }
      }
      const {store, transaction} = await openStore('patients');
      store.add(state.patient);
      
      return transaction.complete;
    },
    async deletePatient(id) {
      const { store, transaction } = await openStore('patients');
      store.delete(id);
      return transaction.complete;
    },
    async loadHospitals(state, newHospitals) {
      state.hospitals = newHospitals;

      const {store, transaction} = await openStore('hospitals');
      if (await store.get(0)) {
        store.put(state.hospitals, 0);
      } else {
        store.add(state.hospitals);
      }
      return transaction.complete;
    }
  },
})

async function openStore(name) {
  const db = await openDB('local');
  const transaction = db.transaction([name], 'readwrite');
  return { store: transaction.objectStore(name), transaction};
}

export default store;