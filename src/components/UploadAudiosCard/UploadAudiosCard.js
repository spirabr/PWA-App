import { openDB } from 'idb';

export async function setPatientAsSent(patient) {
  const db = await openDB('local');
  const transaction = db.transaction(['patients'], 'readwrite');
  
  const oldRecord = transaction.objectStore('patients').get(patient.id);
  oldRecord.sent = true;
  transaction.objectStore('patients').put(oldRecord, patient.id);
  
  return transaction.complete;
} 