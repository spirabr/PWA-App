<template>
  <transition name="slideUp">
    <v-container>
      <back-home-button/>
      <h1>
        upload
      </h1>
      <p>
        Clique em <strong>enviar todas</strong> para enviar todas as coletas 
        ou clique em <strong>enviar</strong> em alguma coleta para enviá-la.
      </p>
      <v-btn 
        block
        rounded
        large
        color="var(--purple-color)" 
        class="mb-3 upload-button"
        @click="uploadAllSamples()"
      >
        enviar todas
      </v-btn>
      <v-btn 
        block
        rounded
        large
        color="var(--purple-color)" 
        class="mb-3 upload-button"
        @click="dumpAllSamples()"
      >
        gerar arquivo local
      </v-btn>
      <div class="cards-container">
        <UploadAudiosCard v-for="(sample, index) in samples" :key="sample.id"
          :sample="sample"
          :http="instance"  
          :audios="sample.audios"
          ref="uploadCards"
          @deleted="deleteSample(index)"
        >
        </UploadAudiosCard>
      </div>
    </v-container>
  </transition>
</template>

<script>
import UploadAudiosCard from '@/components/UploadAudiosCard/UploadAudiosCard.vue';
import axios from 'axios'; // TODO: move this to global scope
import BackHomeButton from '@/components/BackHomeButton';

const instance = axios.create();

export default {
  name: 'Upload',
  components: { UploadAudiosCard, BackHomeButton },
  data: () => ({
    instance: instance,
    samples: []
  }),
  async beforeMount() {
    const patients = await this.$store.getters.allPatients;

    this.samples = patients.filter(patient => (patient && patient.form && patient.id))
      .map(patient => (
        {
          id: patient.id,
          ...patient.form,
          audios: {
            aceite: patient.aceite,
            sustentada: patient.sustentada,
            parlenda: patient.parlenda,
            frase: patient.frase
          },
          sent: patient.sent
        }));
  },
  methods: {
    uploadAllSamples() {
      this.$refs.uploadCards.forEach((card) => card.submitSample());
    },
    dumpAllSamples() {
      const samples = this.$refs.uploadCards.map((card) => card.dumpSample());
      
      if(samples.size == 0){
        return;
      }

      const fields = Object.keys(samples[0]);
      const replacer = ( _ , value) => { return value === null ? '' : value; };
      const csv = samples.map(function(sample){
        return fields.map(function(fieldName){
          return JSON.stringify(sample[fieldName], replacer);
        }).join(',');
      });
      csv.unshift(fields.join(','));
      this.download(csv.join('\r\n'));
    },
    deleteSample(index) {
      this.samples.splice(index, 1);
    },
    download(data) {
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', 'samples.csv');
      a.click();
    }
  }
};
</script>

<style scoped>
  .container {
    padding: 24px 22px;
    display: flex;
    flex-direction: column;
  }
  .slideUp-enter-active {
    transition: opacity 1s;
    transform: translateY(200px);
  }
  h1 {
    margin: 0 0 35px 0;
  }
  p {
    text-align: left;
    font-weight: normal;
    color: #707070;
    padding-bottom: 3%;
  }
  .v-size--large {
    font-weight: bold;
    font-size: 16.5px;

    color: white;
  }
  .upload-button {
    flex: unset;
    height: 47px;
  }
</style>