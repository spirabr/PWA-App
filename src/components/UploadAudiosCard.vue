<template>
  <v-card class="upload-audios-card"
    outlined
    hover
    :loading="isUploading"
    :disabled="isUploading"
  >
    <div class="card-content">
      <v-card-title class="title">{{patient.name}}</v-card-title>
      <v-card-subtitle class="subtitle">{{location.name}} - RGH: {{patient.rgh}}</v-card-subtitle>
      <v-card-text class="description">Coleta realizada em: {{sampleDate}}</v-card-text>
    </div>
    <div class="card-actions">
      <v-card-actions class="flex-column">
        <v-btn class="upload" text @click="uploadAudios">
          Upload
        </v-btn>
        <v-btn class="delete" text :color="'red'">
          Delete
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>

export default {
  name: 'UploadAudiosCard',
  props: ['patient', 'location', 'sampleDate', 'http'],
  data: () => ({
    isUploading: false,
  }),
  methods: {
    async uploadAudios() {
      const audios = this.$attrs.audios

      const requestData = {
        patientId: this.patient.id,
        collector: {
          name: this.patient.name,
          hospital: this.location.name
        },
        audios: {
          aceite: audios.aceite,
          sustentada: audios.sustentada,
          parlenda: audios.parlenda,
          frase: audios.frase
        }
      }
      const response = await this.http.post('/', requestData)
    }
  }
}
</script>

<style>
  .upload-audios-card {
    display: flex;
    flex: 1 1 auto;
    padding: 5px;
    margin-bottom: 20px;
  }
  .upload-audios-card .title {
    font-weight: 600
  }
  .upload-audios-card .card-actions {
    align-self: center
  }
  .card-actions {
    min-width: 100px;
  }
</style>