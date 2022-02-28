<template>
  <transition name="slideUp">
    <v-container>
      <back-home-button/>
      <h1>
        upload
      </h1>
      <p>
        Clique em <strong>upload</strong> para enviar o áudio.
      </p>
      <div class="cards-container">
        <UploadAudiosCard v-for="sample in samples" :key="sample.id"
          :sample="sample"
          :http="instance"
          :audios="sample.audios"
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
  async created() {
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
</style>