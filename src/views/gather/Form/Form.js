import axios from 'axios';

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
    const newHospitals = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/hospital`);
    component.$store.commit('loadHospitals', newHospitals.data);
    return newHospitals.data;
  }
  catch {
    return await component.$store.getters.getHospitals;
  }
}

export async function loadOrRequestModels(component) {
  try {
    const newModels = await axios.get(`${process.env.VUE_APP_IS_INFERENCE_APP}/models`);
    component.$store.commit('loadModels', newModels.data);
    return newModels.data;
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

export function isInferenceApp(){
  return (process.env.VUE_APP_IS_INFERENCE_APP === 'true');
}