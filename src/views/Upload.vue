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
import axios from 'axios'

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
    Promise.all(patients.filter(e => (e && e.form && e.id)).map(async e => {
      const fileReader = new FileReader()

      const toBase64 = file => new Promise((resolve, reject) => {
        fileReader.onload = () => resolve(fileReader.result)
        fileReader.onerror = error => reject(error)

        fileReader.readAsDataURL(file)
      })
      const data = {
        patient: {
          id: e.id,
          rgh: e.form.rgh
        },
        location: {
          name: e.form.local
        },
        audios: {
          aceite: await toBase64(e.aceite),
          sustentada: await toBase64(e.sustentada),
          parlenda: await toBase64(e.parlenda),
          frase: await toBase64(e.frase)
        }
      }
      // console.log({data})
      return data
    })).then(e => e.map(sample => this.samples.push(sample)))
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