const getAudioConfigs = () => ({
  echoCancellation: stringToBool(localStorage.getItem('echoCancellation') || 'true'),
  autoGainControl: stringToBool(localStorage.getItem('autoGainControl') || 'true'),
  noiseSuppression: stringToBool(localStorage.getItem('noiseSuppression') || 'true'),
});

function stringToBool(value) {
  return value === 'true' ? true : false;
}

export default getAudioConfigs;