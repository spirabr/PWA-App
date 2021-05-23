<template>
  <transition name="slideUp">
    <v-container>
      <router-link to="/">
        <v-icon 
          class="close-btn"
        >
          mdi-window-close
        </v-icon>
      </router-link>
      <h1>
        upload
      </h1>
      <p>
        clique em "upload" para enviar o áudio.
      </p>
      <div class="cards-container">
        <UploadAudiosCard v-for="sample in samples" :key="sample.patient.id"
          :patient="sample.patient"
          :sampleDate="sample.date"
          :location="sample.location"
          :http="instance"
          :audios="sample.audios"
        >
        </UploadAudiosCard>
      </div>
    </v-container>
  </transition>
</template>

<script>
import UploadAudiosCard from '../components/UploadAudiosCard'
import axios from 'axios' // TODO: move this to global scope

const instance = axios.create()

export default {
  name: 'Upload',
  components: {UploadAudiosCard},
  async created () {
    const patients = await this.$store.getters.allPatients

    this.samples = patients.filter(e => (e && e.form && e.id)).map(e => {

      const data = {
        patient: {
          id: e.id,
          rgh: e.form.rgh
        },
        location: {
          name: e.form.local
        },
        date: e.form.date,
        audios: {
          aceite: e.aceite,
          sustentada: e.sustentada,
          parlenda: e.parlenda,
          frase: e.frase
        }
      }
      // console.log({data})
      return data
    })
  },
  data: () => ({
    instance: instance,
    samples: []
  })
}
</script>

<style scoped>
  .container {
    padding: 24px 18px;
    display: flex;
    flex-direction: column;
  }
  .slideUp-enter-active {
    transition: opacity 1s;
    transform: translateY(200px);
  }
  .close-btn {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }
  h1 {
    margin: 7.5% 0;
  }
  p {
    text-align: center;
    font-weight: normal;
    color: var(--purple-color);
    padding-bottom: 3%;
  }
</style>