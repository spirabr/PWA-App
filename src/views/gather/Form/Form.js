import axios from 'axios';
import { getInferenceAxios, isInferenceApp } from '../../../services/inference';

export function validateRGH(hospital, rgh) {
  if (hospital === 'Hospital das Clínicas') {
    if (rgh.length !== 9) {
      return false;
    }
    const numeroDeControle = 11 - ((8 * rgh[1] + 7 * rgh[2] + 6 * rgh[3] + 5 * rgh[4] + 4 * rgh[5] + 3 * rgh[6] + 1 * rgh[7]) % 11);

    return rgh[rgh.length - 1] === String.fromCharCode(64 + numeroDeControle);
  }
  return true;
}

export async function loadOrRequestHospitals(component) {
  try {
    if(isInferenceApp()){
      const requestOptions = {
        headers: {
          'Authorization': `Bearer ${component.$cookies.get('token')}`,
        }
      };
  
      const $axios = getInferenceAxios();
      const newHospitals = await $axios.get('/hospitals/',requestOptions);
      return newHospitals.data.hospitals;

    } else {
      const $axios = axios.create({
        baseURL: `${process.env.VUE_APP_BACKEND_URL}`
      });
      const newHospitals = await $axios.get('/hospital');
      return newHospitals.data;
    }
  }
  catch (e){
    console.log(e);
    return await component.$store.getters.getHospitals;
  }
}

export async function loadOrRequestModels(component) {
  try {
    const requestOptions = {
      headers: {
        'Authorization': `Bearer ${component.$cookies.get('token')}`,
      }
    };

    const $axios = getInferenceAxios();

    const newModels = await $axios.get('/models/',requestOptions);
    console.log(newModels);
    component.$store.commit('loadModels', newModels.data.models);
    return newModels.data.models;
  }
  catch {
    return await component.$store.getters.getModels;
  }
}


export function todaysDate() {
  const today = new Date();
  //TODO: fix timezone error
  return today.toISOString();
}