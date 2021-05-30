<template>
  <v-container>
    <v-stepper v-model="cur_step">

      <v-stepper-header 
        app
        class="elevation-0"
      >
        
        <v-stepper-step
          step=""
          :complete="cur_step > 1"
          :active-step="cur_step == 1"
        >
          Vogal Sustentada
        </v-stepper-step>


        <v-stepper-step
          step=""
          :complete="cur_step > 2"
        >
          Parlenda
        </v-stepper-step>


        <v-stepper-step
          step=""
        >
          Frase
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items id="stepper-content">
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
              Por exemplo: 
            </p>
            <p class="parlenda"> “Batatinha quando nasce <br>
              Esparrama pelo chão …”
            </p>
            <p>
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
            <h2>
              O amor ao próximo ajuda a enfrentar <br> 
              essa fase com a força que a gente precisa 
            </h2>
          </div>
          <v-btn
            outlined
            rounded
            block
            color="var(--purple-color)"
            @click="goToDone"
            class="skip-btn"
            v-if="skipBtn"
          >
            pular esta etapa
          </v-btn>
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
import router from '@/router'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  name: 'Gather',
  data: () => ({
    cur_step: 1,
    recording: false,
    allowSkip: true,
  }),
  components: { Microphone},
  methods: {
    async startCountdown() {
      this.allowSkip = false;
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
    },
    skipBtn() {
      return this.allowSkip;
    }
  }
}
</script>

<style scoped>
  .container {
    padding: 0;
  }
  .parlenda {
    width: 100%;
    height: 100%;

    font-weight: bold;
    font-style: italic;
    text-align: center;
  }
  .v-stepper {
    width: 100%;
    height: 100%;
  }
  .v-stepper__items, .v-stepper__content {
    height: calc(100vh - 36px);
  }
  .v-stepper__content {
    display: flex;
    justify-content: stretch;
    padding: 0 22px 30px 22px;
  }
  .v-stepper__header {
    padding: 0 22px;
    margin-top: 14px;
    height: 36px;
  }
  .v-stepper__step {
    padding: 0;
  }
  h1 {
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 14px 0 28px 0;
  }
  h2 {
    color: var(--purple-color);
    font-weight: normal;
  }
  li::marker {
    padding: 0;
    font-weight: bold;
  }
  .skip-btn {
    align-self: flex-end;
    position: relative;
    top: 47px;

    opacity: 66%;
    
    font-weight: bold;
    font-size: 1.3rem;

    border: 2.7px solid var(--purple-color);
  }
  .v-btn:not(.v-btn--round).v-size--default {
    height: 47px;
  }
</style>