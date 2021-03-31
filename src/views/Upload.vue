<template>
  <v-container>
    <div class="logo">
      <v-img 
          src='../assets/SpiraLogo.jpg'
          contain
          max-height="150"
          max-width="250"
      ></v-img>
        
      <h1>SPIRA</h1>
    </div>
    <v-list class="cards-container">
      <UploadAudiosCard
        :patient="patient"
        :sampleDate="'31/03/2021'"
        :location="location"
        :http="instance"
      >
      </UploadAudiosCard>
    </v-list>
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
  data: () => ({
    instance: instance,
    patient: {
      id: '123456',
      name: 'Renan Nakazawa'
    },
    location: {
      name: 'Hospital Albert Einstein'
    }
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