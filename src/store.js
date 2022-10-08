import Vuex from 'vuex';
import Vue from 'vue';
import { openDB } from 'idb';

Vue.use(Vuex);

export function createIndexedDB() {
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
}

const store = new Vuex.Store({
  state: {
    patient: {
      id: null,
      form: null,
      sent: false,
      aceite: null,
      sustentada: null,
      parlenda: null,
      frase: null,
    },
    hospitals: [],
    user: {
      id: null,
      token: null,
    }
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
        state.hospitals = await store.getAll() || [{ hospitalName: 'Hospital das Clínicas'}];
      }
      return state.hospitals;
    },
  },
  mutations: {
    clearPatient(state) {
      state.patient = {
        patient: {
          id: null,
          form: null,
          aceite: null,
          sustentada: null,
          parlenda: null,
          frase: null,
        },
        hospitals: [],
      };
    },
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
      for (let field in state.patient) {
        if (field !== 'form' && field !== 'id' && field !== 'sent') {
          const preBlob = await fetch(state.patient[field]);
          const blob = await preBlob.blob();
          state.patient[field] = new File([blob], field, { type: 'audio/wav' } );
        }
      }
      const {store, transaction} = await openStore('patients');
      store.add(state.patient);
      
      return transaction.complete;
    },
    async deletePatient(state, id) {
      const { store, transaction } = await openStore('patients');
      store.delete(id);
      return transaction.complete;
    },
    async loadHospitals(state, newHospitals) {
      state.hospitals = newHospitals;

      const { store, transaction } = await openStore('hospitals');
      for (let i = 0; i < state.hospitals.length; i += 1) {
        store.put(state.hospitals[i]);
      }
      
      return transaction.complete;
    }
  },
});

async function openStore(name) {
  const db = await openDB('local');
  const transaction = db.transaction([name], 'readwrite');
  return { store: transaction.objectStore(name), transaction};
}

export default store;
