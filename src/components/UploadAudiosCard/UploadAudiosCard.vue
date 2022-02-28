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
        <v-card-title class="title">{{ sample.name }}</v-card-title>
        <v-card-subtitle class="subtitle"
          >{{ sample.local}} - RGH: {{ sample.rgh }}</v-card-subtitle
        >
        <v-card-text class="description"
          >Coleta realizada em: {{ sample.date }}</v-card-text
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
  props: ['sample', 'http', 'audios'],
  data: () => ({
    isUploading: false,
    isDisabled: false,
    errorSending: false,
    sent: false,
  }),
  created() {
    this.sent = this.sample.sent;
  },
  methods: {
    async submitSample() {
      this.isUploading = true;
      this.isDisabled = true;

      try {
        const statusUploadMetadata = await uploadMetadata({
          patientId: this.id,
          collector: {
            patientRgh: this.sample.rgh,
            sampleType: this.sample.sampleType,
            gender: this.sample.sex,
            age: this.sample.age,
            respiratoryInsufficiencySituation: {
              respiratoryInsufficiencyStatus: this.sample.internedByRespiratoryInsufficiency.value,
              location: this.sample.internedByRespiratoryInsufficiency.location
            },
            CID: this.sample.cid,
            respiratoryFrequency: this.sample.respiratoryFrequency,
            hospitalName: this.sample.local,
            collectionDate: this.sample.date,
            maskType: this.sample.mask,
            covidSituation: {
              covidStatus: this.sample.covid.value,
              lastPositiveDiagnoseDate: this.sample.covid.lastPositiveDiagnoseDate,
              hospitalized: this.sample.covid.hospitalized,
              hospitalizationStart: this.sample.covid.hospitalizationStart,
              hospitalizationEnd: this.sample.covid.hospitalizationEnd,
            },
            saturacaoOxigenio: this.sample.oxygenSaturation,
            bpm: this.sample.bpm
          },
        }, this.http);

        if (statusUploadMetadata >= 200 || statusUploadMetadata < 300) {
          const audiosFormData = new FormData();

          audiosFormData.append('aceite', this.audios.aceite);
          audiosFormData.append('sustentada', this.audios.sustentada);
          audiosFormData.append('parlenda', this.audios.parlenda);
          audiosFormData.append('frase', this.audios.frase);

          const statusUploadAudios = await uploadAudios(audiosFormData, this.sample.local, this.sample.rgh, this.http);
          this.sample.sent = true;
          if (statusUploadAudios >= 200 || statusUploadAudios < 300) {
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

        this.sent = true;

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