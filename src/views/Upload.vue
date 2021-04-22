<template>
  <v-container>
    <div class="logo">
      <v-img 
          src='../assets/SpiraLogo.jpg'
          contain
          max-height="150"
          max-width="250"
      ></v-img>
        
      <h1 @click="testDb">SPIRA</h1>
    </div>
    <div class="cards-container">
      <UploadAudiosCard v-for="sample in samples" :key="sample.patient.id"
        :patient="sample.patient"
        :sampleDate="'31/03/2021'"
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

const baseURL = `${process.env.VUE_APP_BACKEND_URL}:${process.env.VUE_APP_BACKEND_PORT}`

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

    // TODO: Refactor. toBase64 function needs to be async
    const toBase64 = (file, reader = new FileReader()) => new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)

        reader.readAsDataURL(file)
      })

    this.samples = patients.filter(e => (e && e.form && e.id)).map(e => {

      const data = {
        patient: {
          id: e.id,
          rgh: e.form.rgh
        },
        location: {
          name: e.form.local
        },
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