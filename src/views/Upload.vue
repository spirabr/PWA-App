<template>
  <v-container>
    <div class="logo">
      <v-img 
        src='../../public/img/video/logo_spira_anim.gif'
        contain
        height="100%"
        width="100%"
        max-height="215"
        max-width="255"
      ></v-img>
        
      <h1 @click="testDb">SPIRA</h1>
    </div>
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
</template>

<script>
import UploadAudiosCard from '../components/UploadAudiosCard'
import axios from 'axios' // TODO: move this to global scope

const baseURL = `${process.env.BACKEND_URL}`

const instance = axios.create({
  baseURL: baseURL
})

export default {
  name: 'Upload',
  components: {UploadAudiosCard},
  methods: {
    async testDb() {
      console.log(await this.$store.getters.allPatients)
    }
  },
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
    height: 100%;
    width: 100%;
    align-items: center;
    padding: 2rem 2rem 0 2rem;
    position: relative;
  }
  .logo{
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .cards-container {
    margin: 20;
  }
  .v-footer {
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    bottom: 0;
    height: 50px;
    width: 100%;
  }
  .theme--light.v-footer {
    color: white;
    background-color: #500486;
  }
</style>