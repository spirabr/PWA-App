<template>
  <v-container>
    <v-stepper v-model="cur_step">

      <v-stepper-header app>
        <v-stepper-step
          id="step-marker"
          step="1"
          :complete="cur_step > 1"
        >
          Aceite
        </v-stepper-step>
        
        
        <v-stepper-step
          step="2"
          :complete="cur_step > 2"
        >
          Vogal Sustentada
        </v-stepper-step>


        <v-stepper-step
          step="3"
          :complete="cur_step > 3"
        >
          Parlenda
        </v-stepper-step>


        <v-stepper-step
          step="4"
        >
          Frase
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <div>
            <div class="placeholder">
              <h1>termo de partipação</h1>
            </div>
            <div class="placeholder">
              Você está sendo convidado a participar de um estudo para desenvolver um método automático para detectar pessoas que possam evoluir com problemas respiratórios. \n
              Caso você concorde iremos pedir para que você grave uma ou mais frases pelo computador. \n
              Os dados de sua voz serão analisados por pesquisadores da Universidade de São Paulo de forma anônima. \n
              Nenhum dado pessoal seu será incluído em nenhum documento do estudo. \n  
            </div>
          </div>

          <Microphone
            :noiseSuppression="false"
            :echoCancellation="false"
            :autoGainControl="false"
            @ready="updateStepper"
          />

        </v-stepper-content>

        <v-stepper-content step="2">
          <div>
            <div class="placeholder">
              <h1>Vogal Sustentada</h1>
            </div>
            <div class="placeholder">
              <p>Inspire e fale a vogal "a" até acabar o ar</p>
            </div>
          </div>

          <Microphone
            :noiseSuppression="false"
            :echoCancellation="false"
            :autoGainControl="false"
            @ready="updateStepper"
          />

        </v-stepper-content>

        <v-stepper-content step="3">
          <div>
            <div class="placeholder">
              <h1>Parlenda</h1>
            </div>
            <div class="placeholder">
              <p>Recite uma frase que sabe de cor. 
                Pode ser uma oração ou uma frase clássica.
                Não cante a frase.
              </p>
            </div>
          </div>

          <Microphone
            :noiseSuppression="false"
            :echoCancellation="false"
            :autoGainControl="false"
            @ready="updateStepper"
          />

        </v-stepper-content>

        <v-stepper-content step="4">
          <div>
            <div class="placeholder">
              <h1> Frase lida </h1>
            </div>
            <div class="placeholder">
              <p>Leia a frase a seguir em voz alta</p>
            </div>
            <VTextMarquee :duration="8" :paused="scroll">
              <h1>
                -                                              - 
                O amor ao próximo ajuda a enfrentar essa fase com a força que a gente precisa 
              </h1>
            </VTextMarquee>
          </div>

          <div @click="startCountdown()">
            <Microphone
              :noiseSuppression="false"
              :echoCancellation="false"
              :autoGainControl="false"
              @ready="goToDone"
            />
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import Microphone from '@/components/Microphone'
import VTextMarquee from 'vue-marquee-text-component'
import router from '@/router'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  name: 'Gather',
  data: () => ({
    cur_step: 1,
    carousel: 1,
    recording: false,
  }),
  components: { Microphone, VTextMarquee },
  methods: {
    async startCountdown() {
      if (!this.recording)
        await sleep(1000);
      this.recording = !this.recording;
    },
    async goToDone() {
      await router.push('/gather/done');
    },
    updateStepper() {
      this.cur_step++;
    }
  },
  computed: { 
    scroll() {
      return !this.recording;
    }
  }
}
</script>

<style scoped>
  .container {
    padding: 0;
  }
  .v-stepper {
    width: 100%;
    height: 100%;
  }
  .v-stepper__items, .v-stepper__content {
    height: 100%;
  }
  .v-stepper__wrapper{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .v-stepper__header {
    padding: 0px 5%;
    height: 36px;
  }
  .v-stepper__step {
    padding: 0 20px;
  }
  .ready-btn {
    color: white;
  }
  .placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 7% 0;
  }
  .placeholder h1 {
    margin-right: 10px;
  }
  .v-stepper__content {
    padding: 1% 8.5%;
  }
  a {
    text-decoration: none;
  } 
</style>