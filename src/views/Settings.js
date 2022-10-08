export function isInferenceApp(){
    return (process.env.VUE_APP_IS_INFERENCE_APP === 'true');
}