import { openDB } from 'idb';

export async function setPatientAsSent(patient) {
  const db = await openDB('local');
  const transaction = db.transaction(['patients'], 'readwrite');
  
  const oldRecord = transaction.objectStore('patients').get(patient.id);
  oldRecord.sent = true;
  transaction.objectStore('patients').put(oldRecord, patient.id);
  
  return transaction.complete;
}

export async function uploadMetadata(requestData, http) {
  // Audios will be sent on a separate request
  const patientRegisterResponse = await http.post(
    `${process.env.VUE_APP_BACKEND_URL}/patient`,
    requestData
  );

  return patientRegisterResponse.status;
}

export async function uploadAudios(audiosFormData, name, rgh, http) {
  const requestOptions = {
    headers: {
      'Content-Type': `multipart/form-data; boundary=${audiosFormData._boundary}`,
    },
  };
  const audioUploadResponse = await http.put(
    `${process.env.VUE_APP_BACKEND_URL}/patient/${name}/${rgh}/audio`,
    audiosFormData,
    requestOptions
  );

  return audioUploadResponse.status;
}

export async function sendInference(token, userId, requestData, http) {
  const requestOptions = {
    headers: {
      'Content-Type': 'multipart/form-data;',
      'Authorization': `Bearer ${token}`,
    }
  };
  // Audios will be sent on a separate request
  const patientRegisterResponse = await http.post(
    `${process.env.VUE_APP_INFERENCE_BACKEND_URL}/${process.env.VUE_APP_INFERENCE_VERSION}/users/${userId}/inferences`,
    requestData,
    requestOptions
  );

  return patientRegisterResponse.status;
}