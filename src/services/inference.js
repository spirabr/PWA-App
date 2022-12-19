import axios from 'axios';
import moment from 'moment';

export function getInferenceAxios(){
  return axios.create({
    baseURL: `${process.env.VUE_APP_INFERENCE_BACKEND_URL}/${process.env.VUE_APP_INFERENCE_VERSION}`
  });
}

export function isInferenceApp(){
  return (process.env.VUE_APP_IS_INFERENCE_APP === 'true');
}

export async function requestInferences(state) {
  try {
    const requestOptions = {
      headers: {
        'Authorization': `Bearer ${state.$cookies.get('token')}`,
      }
    };

    const $axios = getInferenceAxios();
    
    const inferencesResponse = 
      await $axios.get(`/users/${state.$cookies.get('user_id')}/inferences`,requestOptions);

    const modelsResponse = 
    await $axios.get('/models/',requestOptions);
    for(const inference of inferencesResponse.data.inferences){
      const resultResponse = 
        await $axios.get(`/users/${state.$cookies.get('user_id')}/inferences/${inference.id}/result`,requestOptions);

      inference.diagnosis = resultResponse.data.result.diagnosis;
      inference.model = modelsResponse.data.models.find((model)=>model.id == inference.model_id).name;
      inference.created_in = moment.utc(inference.created_in).format('DD-MM-YYYY - HH:mm:ss');
    }    

    return inferencesResponse.data.inferences;
  }
  catch {
    return await state.$store.getters.getInferences;
  }
}