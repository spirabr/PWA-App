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
      <v-btn class="upload" text @click="submitSample">
        Upload
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { uploadAudios, uploadMetadata } from './UploadAudiosCard';

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
    async submitSample() {
      this.isUploading = true;
      this.isDisabled = true;

      try {
        const statusUploadMetadata = await uploadMetadata({
          patientId: this.patient.id,
          collector: {
            patientRgh: this.patient.rgh,
            hospitalName: this.location.name,
            patientSex: this.patient.sex,
            covidStatus: this.patient.covid,
            maskType: this.patient.mask,
          },
        }, this.http);

        if (statusUploadMetadata >= 200 || statusUploadMetadata < 300) {
          const audiosFormData = new FormData();

          audiosFormData.append('aceite', this.$attrs.audios.aceite);
          audiosFormData.append('sustentada', this.$attrs.audios.sustentada);
          audiosFormData.append('parlenda', this.$attrs.audios.parlenda);
          audiosFormData.append('frase', this.$attrs.audios.frase);

          const statusUploadAudios = await uploadAudios(audiosFormData, this.location.name, this.patient.rgh, this.http);
          this.sent = true;
          if (statusUploadAudios >= 200 || statusUploadAudios < 300) {
            this.$emit('uploaded');
            this.errorSending = false;
            this.isDisabled = true;
          } else {
            this.errorSending = true;
            this.isDisabled = false;
          }
        } else {
          this.errorSending = true;
          this.isDisabled = false;
        }
      } catch (error) {
        console.error(error);
        this.errorSending = true;
        this.sent = true;
        this.isDisabled = false;
      }

      this.isUploading = false;
    }
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