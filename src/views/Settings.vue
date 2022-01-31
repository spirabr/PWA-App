<template>
  <v-container class="container-padding">
    <GatherHeader title="Configurações"/>
    <v-row class="d-flex justify-center">
      <p>Selecione as configurações de áudio desejadas</p>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-switch
        v-model="echoCancellationComputed"
        label="Cancelamento de Eco"
      ></v-switch>
    </v-row>

    <v-row class="d-flex justify-center">
      <v-switch
        v-model="autoGainControlComputed"
        label="Controle Automático de Ganho"
      ></v-switch>
    </v-row>
   
    <v-row class="d-flex justify-center">
      <v-switch
        v-model="noiseSuppressionComputed"
        label="Supressão de Ruído"
      ></v-switch>
    </v-row>
    <v-row class="record-button-height">
      <Microphone
        :upload=true
        @newAudio="saveTestAudio"
        @ready="sendTestAudio"
      />
    </v-row>
  </v-container>
</template>

<script>
import Microphone from '@/components/Microphone.vue';
import GatherHeader from '@/components/GatherHeader.vue';
import getAudioConfigs from '@/services/audioConfigs';
import axios from 'axios';

export default {
  components: { Microphone, GatherHeader },
  data: () => ({
    audioConstraints: {
      echoCancellation: true,
      autoGainControl: true,
      noiseSuppression: true,
    },
    audioFile: undefined,
  }),
  mounted() {
    this.audioConstraints = getAudioConfigs();
  },
  methods: {
    boolToString(value) {
      return value ? 'true' : 'false';
    },
    async sendTestAudio() {
      const requestOptions = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const audioFileForm = new FormData();
      audioFileForm.append('audio', this.audioFile);

      try {
        await axios.post(
          `${process.env.VUE_APP_BACKEND_URL}/test`,
          audioFileForm,
          requestOptions
        );
      }
      catch (error) {
        console.error(error);
      }
    },
    async saveTestAudio(blobURL) {
      const preBlob = await fetch(blobURL);
      const blob = await preBlob.blob();
      const audioFile = new File([blob], 'test', { type: 'audio/wav' } );

      this.audioFile = audioFile;
    }
  },
  computed: {
    echoCancellationComputed: {
      get() {
        return this.audioConstraints.echoCancellation;
      },
      set(val) {
        this.audioConstraints.echoCancellation = val;
        localStorage.setItem('echoCancellation', this.boolToString(val));
      }
    },
    autoGainControlComputed: {
      get() {
        return this.audioConstraints.autoGainControl;
      },
      set(val) {
        this.audioConstraints.autoGainControl = val;
        localStorage.setItem('autoGainControl', this.boolToString(val));
      }
    },
    noiseSuppressionComputed: {
      get() {
        return this.audioConstraints.noiseSuppression;
      },
      set(val) {
        this.audioConstraints.noiseSuppression = val;
        localStorage.setItem('noiseSuppression', this.boolToString(val));
      }
    }
  }
};
</script>

<style scoped>
  button {
    margin-top: 16px;
    margin-bottom: 0px;
  }
  .record-button-height {
    height: calc(17px + 2*47px) !important;
  }
  .container-padding {
    padding: 24px 22px !important;
  }
  .flex-off {
    flex: unset;
  }
</style>