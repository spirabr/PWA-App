<template>
  <v-container>
    <v-stepper v-model="cur_step">

      <v-stepper-header app>
        
        <v-stepper-step
          step="1"
          :complete="cur_step > 1"
        >
          Vogal Sustentada
        </v-stepper-step>


        <v-stepper-step
          step="2"
          :complete="cur_step > 2"
        >
          Parlenda
        </v-stepper-step>


        <v-stepper-step
          step="3"
        >
          Frase
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <div>
            <h1>vogal sustentada</h1>
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
            :Reset=true
            @newAudio="saveSustentada"
            @ready="updateStepper"
          />

        </v-stepper-content>

        <v-stepper-content step="2">
          <div>
            <h1>parlenda</h1>
            <p>Favor falar um verso que saiba de cor. <br>
              Por exemplo: <br>
              <i> “Batatinha quando nasce <br>
                Esparrama pelo chão …” <br> </i>
              Caso não se lembre de nenhum verso, pode ser substituído por uma oração.
            </p>
          </div>

          <Microphone
            :Reset=true
            @newAudio="saveParlenda"
            @ready="updateStepper"
          />

        </v-stepper-content>

        <v-stepper-content step="3">
          <div>
            <h1> frase lida </h1>
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
              :Reset=true
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
    align-content: space-around;
  }
  .v-stepper__header {
    padding: 0px 5%;
    height: 36px;
  }
  .v-stepper__step {
    padding: 0;
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
    margin: 7% 0 14% 0;
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