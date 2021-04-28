<template>
  <v-card
    class="upload-audios-card"
    outlined
    hover
    :loading="isUploading"
    :disabled="isDisabled"
  >
    <div class="card-content">
      <v-card-title class="title">{{ patient.name }}</v-card-title>
      <v-card-subtitle class="subtitle"
        >{{ location.name }} - RGH: {{ patient.rgh }}</v-card-subtitle
      >
      <v-card-text class="description"
        >Coleta realizada em: {{ sampleDate }}</v-card-text
      >
    </div>
    <div class="card-actions">
      <v-card-actions class="flex-column">
        <v-btn class="upload" text @click="uploadAudios">
          Upload
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "UploadAudiosCard",
  props: ["patient", "location", "sampleDate", "http"],
  data: () => ({
    isUploading: false,
    isDisabled: false,
  }),
  methods: {
    async uploadAudios() {
      this.isUploading = true;
      this.isDisabled = true;
      // Audios will be sent on a separate request
      const requestData = {
        patientId: this.patient.id,
        collector: {
          patientRgh: this.patient.rgh,
          hospitalName: this.location.name,
        },
      };

      try {
        const patientRegisterResponse = await this.http.post(
          "patient",
          requestData
        );
        if (patientRegisterResponse.status === 201) {
          const audios = this.$attrs.audios;
          const audiosFormData = new FormData();
          audiosFormData.append("aceite", audios.aceite);
          audiosFormData.append("sustentada", audios.sustentada);
          audiosFormData.append("parlenda", audios.parlenda);
          audiosFormData.append("frase", audios.frase);
          const requestOptions = {
            headers: {
              "Content-Type": `multipart/form-data; boundary=${audiosFormData._boundary}`,
            },
          };
          const audioUploadResponse = await this.http.put(
            `/patient/${this.location.name}/${this.patient.rgh}/audio`,
            audiosFormData,
            requestOptions
          );
          if (audioUploadResponse.status === 200) {
            // TODO: Make a "success" style
            this.isDisabled = true;
          }
        }
      } catch (error) {
        console.error(error);
        this.isDisabled = false;
      }

      this.isUploading = false;
    },
  },
};
</script>

<style>
.upload-audios-card {
  display: flex;
  flex: 1 1 auto;
  padding: 5px;
  margin-bottom: 20px;
}
.upload-audios-card .title {
  font-weight: 600;
}
.upload-audios-card .card-actions {
  align-self: center;
}
.card-actions {
  min-width: 100px;
}
</style>