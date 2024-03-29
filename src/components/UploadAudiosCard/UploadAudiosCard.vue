<template>
  <v-card
    outlined
    :loading="isUploading"
    :disabled="isDisabled"
    class="mb-3"
  >
    <v-card-title class="d-flex justify-space-between">
      Coleta realizada em: {{ dateToString(sample.date) }}
      <div class="d-flex flex-column align-center ">
        <v-chip
          class="mb-2"
          :color="sentStyle"
        >{{ this.sentText }}</v-chip>

        <v-btn
          class="white--text rounded-lg"
          color="red"
          @click="deleteSample">
          <div class="upload-btn">excluir</div>
        </v-btn>
      </div>
    </v-card-title>

    <v-card-text>
      Dados:
      <ul>
        <li>
          Local de coleta: <strong>{{ sample.local }}</strong>
        </li>
        <li>
          RGH: <strong>{{ sample.rgh }}</strong>
        </li>
        <li v-if="sample.sampleType">
          Tipo de coleta: <strong>{{ sample.sampleType }}</strong>
        </li>
      </ul>
    </v-card-text>
    <v-card-actions class="d-flex justify-center ">
      <v-btn @click="submitSample">
        <div class="upload-btn"> enviar</div>
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
          patientId: this.sample.id,
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
          this.sent = true;
          if (statusUploadAudios >= 200 || statusUploadAudios < 300) {
            this.$emit('deleted');
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
    },
    dumpSample() {
      return {
        patientId: this.sample.id,
        patientRgh: this.sample.rgh,
        sampleType: this.sample.sampleType,
        gender: this.sample.sex,
        age: this.sample.age,
        respiratoryInsufficiencyStatus: this.sample.internedByRespiratoryInsufficiency.value,
        location: this.sample.internedByRespiratoryInsufficiency.location,
        CID: this.sample.cid,
        respiratoryFrequency: this.sample.respiratoryFrequency,
        hospitalName: this.sample.local,
        collectionDate: this.sample.date,
        maskType: this.sample.mask,
        covidStatus: this.sample.covid.value,
        lastPositiveDiagnoseDate: this.sample.covid.lastPositiveDiagnoseDate,
        hospitalized: this.sample.covid.hospitalized,
        hospitalizationStart: this.sample.covid.hospitalizationStart,
        hospitalizationEnd: this.sample.covid.hospitalizationEnd,
        saturacaoOxigenio: this.sample.oxygenSaturation,
        bpm: this.sample.bpm
      };
    }
    ,
    deleteSample() {
      this.$store.commit('deletePatient', this.sample.id);
      this.$emit('deleted');
    },
    dateToString(date) {
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      };
      const formattedDate = new Date(date).toLocaleDateString('pt-br', options);
      return formattedDate === 'Invalid Date' ? date : formattedDate;
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

<style >
.upload-btn {
  font-size: 1.1rem;
}
</style>