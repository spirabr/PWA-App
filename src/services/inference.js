<<<<<<< HEAD
import axios from 'axios';

export function isInferenceApp(){
  return (process.env.VUE_APP_IS_INFERENCE_APP === 'true');
}

export async function requestInferences(state) {
  try {
    const requestOptions = {
      headers: {
        'Content-Type': 'multipart/form-data;',
        'Authorization': `Bearer ${state.$cookies.get('token')}`,
      }
    };
    const inferencesResponse = 
      await axios.get(
        `${process.env.VUE_APP_INFERENCE_BACKEND_URL}/${process.env.VUE_APP_INFERENCE_VERSION}`
          +`/users/${state.$cookies.get('user_id')}/inferences`,requestOptions);

    const modelsResponse = 
      await axios.get(
        `${process.env.VUE_APP_INFERENCE_BACKEND_URL}/${process.env.VUE_APP_INFERENCE_VERSION}`
          +'/models/',requestOptions);

    for(const inference of inferencesResponse.data.inferences){
      const resultResponse = 
        await axios.get(
          `${process.env.VUE_APP_INFERENCE_BACKEND_URL}/${process.env.VUE_APP_INFERENCE_VERSION}`
            +`/users/${state.$cookies.get('user_id')}/inferences/${inference.id}/result`,requestOptions);
      inference.diagnosis = resultResponse.data.result.diagnosis;
      inference.model = modelsResponse.data.models.find((model)=>model.id = inference.model_id).name;
    }

    return inferencesResponse.data.inferences;
  }
  catch {
    return await state.$store.getters.getInferences;
  }
=======
export function isInferenceApp(){
  return (process.env.VUE_APP_IS_INFERENCE_APP === 'true');
>>>>>>> 50d1f98e1254e9ba6c363e6d514f2e97391fb11c
}