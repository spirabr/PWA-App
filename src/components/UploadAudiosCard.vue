<template>
  <v-card class="upload-audios-card"
    outlined
    hover
    :loading="isUploading"
    :disabled="isUploading"
  >
    <div class="card-content">
      <v-card-title class="title">{{title}}</v-card-title>
      <v-card-subtitle class="subtitle">RGH: {{subtitle}}</v-card-subtitle>
      <v-card-text class="description">{{description}}</v-card-text>
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
import { post } from 'axios'

export default {
  name: 'UploadAudiosCard',
  props: ['title', 'description', 'subtitle', 'baseUrl'],
  data: () => ({
    isUploading: false,
  }),
  methods: {
    async uploadAudios() {
      
    }
  }
}
</script>

<style>
  .upload-audios-card {
    display: flex;
    padding: 20
  }
  .upload-audios-card .title {
    font-weight: 600
  }
  .upload-audios-card .card-actions {
    align-self: center
  }
</style>