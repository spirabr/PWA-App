import { uploadAudios, uploadMetadata } from './UploadAudiosCard';

describe('UploadAudioCard', () => {
  describe('auxiliar functions', () => {
    const http = {
      post: jest.fn(() => ({
        status: 200
      })),
      put: jest.fn(() => ({
        status: 200
      })),
    };
    const requestData = {
      patientId: 'Hospital das Clínicas_12345678E',
      collector: {
        patientRgh: '12345678E',
        hospitalName: 'Hospital das Clínicas',
        patientSex: 'F',
        covidStatus: 'Sim',
        maskType: 'NONE',
      },
    };
    const requestAudios = {
      aceite: '',
      sustentada: '',
      parlenda: '',
      frase: '',
    };

    it('should send metadata', async () => {
      expect.assertions(3);
      
      const status = await uploadMetadata(requestData, http);

      expect(status).toBe(200);
      expect(http.post).toHaveBeenCalled();
      expect(http.post.mock.calls[0][1]).toBe(requestData);
    });

    it('should send audios', async () => {
      expect.assertions(2);
      const status = await uploadAudios(requestAudios, 'name', 'rgh', http);

      expect(status).toBe(200);
      expect(http.put).toHaveBeenCalled();
    });
  });
});
