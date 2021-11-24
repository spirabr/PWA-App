<template>
  <v-container>
    <v-row class="mt-2 d-flex justify-center">
        <h1>Configurações</h1>
    </v-row>
    <v-row>
      <p>Selecione as configurações de áudio desejadas</p>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-switch
        v-model="echoCancellation"
        label="Cancelamento de Eco"
      ></v-switch>
    </v-row>

    <v-row class="d-flex justify-center">
      <v-switch
        v-model="autoGainControl"
        label="Controle Automático de Ganho"
      ></v-switch>
    </v-row>
   
    <v-row class="d-flex justify-center">
      <v-switch
        v-model="noiseSuppression"
        label="Supressão de Ruído"
      ></v-switch>
    </v-row>
    <v-row>
      <microphone/>
    </v-row>
  </v-container>
</template>

<script>
import Microphone from '@/components/Microphone.vue';
export default {
  components: { Microphone },
  data: () => ({
    echoCancellation: true,
    autoGainControl: true,
    noiseSuppression: true,
  }),
  mounted() {
    this.echoCancellation = this.stringToBool(localStorage.getItem('echoCancellation') || 'true');
    this.autoGainControl = this.stringToBool(localStorage.getItem('autoGainControl') || 'true');
    this.noiseSuppression = this.stringToBool(localStorage.getItem('noiseSuppression') || 'true');
  },
  methods: {
    stringToBool(value) {
      return value === 'true' ? true : false;
    },
    boolToString(value) {
      return value ? 'true' : 'false';
    },
    save() {


    }
  },
  computed: {
    echoCancellationComputed: {
      get() {
        return this.echoCancellation;
      },
      set(val) {
        this.echoCancellation = val;
        localStorage.setItem('echoCancellation', this.boolToString(val));
      }
    },
    autoGainControlComputed: {
      get() {
        return this.autoGainControl;
      },
      set(val) {
        this.autoGainControl = val;
        localStorage.setItem('autoGainControl', this.boolToString(val));
      }
    },
    noiseSuppressionComputed: {
      get() {
        return this.noiseSuppression;
      },
      set(val) {
        this.noiseSuppression = val;
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
</style>