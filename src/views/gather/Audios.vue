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
              Você está sendo convidado a participar de um estudo para desenvolver um método automático para detectar pessoas que possam evoluir com problemas respiratórios.

              Caso você concorde iremos pedir para que você grave uma ou mais frases pelo computador.

              Os dados de sua voz serão analisados por pesquisadores da Universidade de São Paulo de forma anônima.
              
              Nenhum dado pessoal seu será incluído em nenhum documento do estudo.
            </div>
          </div>

          <Microphone
            :noiseSuppression="false"
            :echoCancellation="false"
            :autoGainControl="false"
            @newAudio="saveTermo"
            @ready="updateStepper"
          />

        </v-stepper-content>

        <v-stepper-content step="2">
          <div>
            <h1>Vogal Sustentada</h1>
            <p>Favor cumprir os seguintes passos: </p>
            <ol>
              <li>
                respire fundo
              </li>
              <li>
                fale em voz alta a vogal “A” até acabar o ar
              </li>
            </ol>     
          </div>

          <Microphone
            :noiseSuppression="false"
            :echoCancellation="false"
            :autoGainControl="false"
            @newAudio="saveSustentada"
            @ready="updateStepper"
          />

        </v-stepper-content>

        <v-stepper-content step="3">
          <div>
            <h1>Parlenda</h1>
            <p>Favor falar um verso que saiba de cor. <br>
              Por exemplo: <br>
              <i> “Batatinha quando nasce <br>
                Esparrama pelo chão …” <br> </i>
              Caso não se lembre de nenhum verso, pode ser substituído por uma oração.
            </p>
          </div>

          <Microphone
            :noiseSuppression="false"
            :echoCancellation="false"
            :autoGainControl="false"
            @newAudio="saveParlenda"
            @ready="updateStepper"
          />

        </v-stepper-content>

        <v-stepper-content step="4">
          <div>
            <h1> Frase lida </h1>
            <p>Favor perguntar se o paciente se importa em ler a frase a seguir. <br>
              Caso contrário, pular esta etapa.</p>
            <v-btn
              outlined
              rounded
              block
              color="red"
              @click="goToDone"
            >
              pular
            </v-btn>
            <VTextMarquee :duration="8" :paused="scroll">
              <h2>
                ------------------------------------------------ 
                O amor ao próximo ajuda a enfrentar essa fase com a força que a gente precisa 
              </h2>
            </VTextMarquee>
          </div>

          <div @click="startCountdown()">
            <Microphone
              :noiseSuppression="false"
              :echoCancellation="false"
              :autoGainControl="false"
              @newAudio="saveFrase"
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
    },
    saveTermo(blobURL) {
      this.$store.commit('saveTermo', blobURL)
    },
    saveSustentada(blobURL) {
      this.$store.commit('saveSustentada', blobURL)
    },
    saveParlenda(blobURL) {
      this.$store.commit('saveParlenda', blobURL)
    },
    saveFrase(blobURL) {
      this.$store.commit('saveFrase', blobURL)
    },
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
  h1 {
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 7% 0;
  }
  h2 {
    color: var(--purple-color);
    font-weight: normal;
  }
  .v-stepper__content {
    position: relative;
    padding: 1% 8.5%;
  }
  a {
    text-decoration: none;
  } 
</style>