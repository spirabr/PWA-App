<template>
  <v-card
    class="upload-audios-card"
    outlined
    hover
    :loading="isUploading"
    :disabled="isDisabled"
  >
    <div class="card-content d-flex align-center pa-2">
      <div class="sample-data">
        <v-card-title class="title">{{ patient.name }}</v-card-title>
        <v-card-subtitle class="subtitle"
          >{{ location.name }} - RGH: {{ patient.rgh }}</v-card-subtitle
        >
        <v-card-text class="description"
          >Coleta realizada em: {{ sampleDate }}</v-card-text
        >
      </div>
      <div class="send-tag align-self-center">
        <v-chip
          :color="sentStyle"
        >{{ this.sentText }}</v-chip>
      </div>
    </div>
    <v-card-actions class="flex-column">
      <v-btn class="upload" text @click="uploadAudios">
        Upload
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {setPatientAsSent} from './UploadAudiosCard';

export default {
  name: 'UploadAudiosCard',
  props: ['patient', 'location', 'sampleDate', 'http'],
  data: () => ({
    isUploading: false,
    isDisabled: false,
    errorSending: false,
    sent: false,
  }),
  created() {
    this.sent = this.patient.sent;
  },
  methods: {
    async uploadAudios() {
      this.isUploading = true;
      this.isDisabled = true;
      // Audios will be sent on a separate request
      const requestData = {
        patientId: this.patient.id,
        collector: {
          patientRgh: this.patient.rgh,
          hospitalName: this.location.name,
          patientSex: this.patient.sex,
          covidStatus: this.patient.covid,
          maskType: this.patient.mask,
        },
      };

      try {
        const patientRegisterResponse = await this.http.post(
          `${process.env.VUE_APP_BACKEND_URL}/patient`,
          requestData
        );
        if (patientRegisterResponse.status === 201) {
          const audios = this.$attrs.audios;

          const audiosFormData = new FormData();

          audiosFormData.append('aceite', audios.aceite);
          audiosFormData.append('sustentada', audios.sustentada);
          audiosFormData.append('parlenda', audios.parlenda);
          audiosFormData.append('frase', audios.frase);
          const requestOptions = {
            headers: {
              'Content-Type': `multipart/form-data; boundary=${audiosFormData._boundary}`,
            },
          };
          const audioUploadResponse = await this.http.put(
            `${process.env.VUE_APP_BACKEND_URL}/patient/${this.location.name}/${this.patient.rgh}/audio`,
            audiosFormData,
            requestOptions
          );
          if (audioUploadResponse.status === 200) {
            this.sent = true;
            this.errorSending = false;
            this.isDisabled = true;
            setPatientAsSent(this.patient.id);
          }
        }
      } catch (error) {
        console.error(error);
        this.errorSending = true;
        this.sent = true;
        this.isDisabled = false;
      }
      this.isUploading = false;
    },
  },
  computed: {
    sentText() {
      return this.sent ? (this.errorSending ? 'Erro ao enviar' : 'Enviado') : (this.isUploading ? 'Enviando...' : 'Não enviado');
    },
    sentStyle() {
      return this.sent ? (this.errorSending ? 'red' : 'green') : (this.isUploading ? 'blue' : 'grey');
    },
  },
};
</script>

<style>
.upload-audios-card {
  display: flex;
  flex: 1 1 auto;
  padding: 5px;
  margin-bottom: 20px;
  background-color: var(--purple-color);
}
.upload-audios-card .title {
  font-weight: 600;
}
.upload-audios-card .card-actions {
  align-self: center;
}
.card-actions {
  min-width: 100px;
}
.upload-audios-card .card-content .sample-data {
  width: 100%;
}
</style>