<template>
  <v-container>
    <v-stepper v-model="curStep">

      <v-stepper-header 
        app
        class="elevation-0"
      >
        
        <v-stepper-step
          step=""
          :complete="curStep >= 1"
        >
          Vogal Sustentada
        </v-stepper-step>


        <v-stepper-step
          step=""
          :complete="curStep >= 2"
        >
          Parlenda
        </v-stepper-step>


        <v-stepper-step
          step=""
          :complete="curStep >= 3"
        >
          Frase
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items id="stepper-content">
        <v-stepper-content step="1">
          <gather-header title="vogal sustentada"/>
          <div class="instruction">
            <p>Favor cumprir os seguintes passos: </p>
            <ol>
              <li>
                você vai inspirar, ou seja, respirar fundo 
              </li>
              <li>
                fazer um [<strong>a</strong>] comprido o máximo de tempo que puder. <br>
                Assim: "<strong>aaa</strong>"
              </li>
            </ol>
          </div>

          <Microphone
            :reset=true
            @newAudio="saveSustentada"
            @ready="updateStepper"
          />

        </v-stepper-content>

        <v-stepper-content step="2">
          <div class="instruction">
            <gather-header title="parlenda"/>
            <p>Agora você poderia dizer alguma coisa de cor? Por exemplo: algo que você
              aprendeu na infância e sabe até hoje?
              <br>
              Por exemplo: 
            </p>
            <p class="parlenda"> “Batatinha quando nasce <br>
              Esparrama pelo chão …”
            </p>
            <p>
              Caso não se lembre de nenhum verso, você gostaria de dizer uma prece ou oração?
            </p>
          </div>

          <Microphone
            :reset=true
            @newAudio="saveParlenda"
            @ready="updateStepper"
          />

        </v-stepper-content>

        <v-stepper-content step="3">
          <div class="instruction">
            <gather-header title="frase"/>
            <p>Você poderia ler a frase destacada abaixo?<br>
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
          <div @click="disallowSkip()">
            <Microphone
              :reset=true
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
import Microphone from '@/components/Microphone.vue';
import router from '@/router';
import GatherHeader from '@/components/GatherHeader.vue';

export default {
  name: 'Gather',
  data: () => ({
    curStep: 1,
    recording: false,
    allowSkip: true,
  }),
  components: { Microphone, GatherHeader },
  methods: {
    disallowSkip() {
      this.allowSkip = false;
    },
    async goToDone() {
      await router.push('/gather/done');
    },
    updateStepper() {
      this.curStep++;
    },
    saveSustentada(blobURL) {
      this.$store.commit('saveSustentada', blobURL);
    },
    saveParlenda(blobURL) {
      this.$store.commit('saveParlenda', blobURL);
    },
    saveFrase(blobURL) {
      this.$store.commit('saveFrase', blobURL);
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
};
</script>

<style scoped>
  .container {
    padding: 0;
  }
  .parlenda {
    font-weight: bold;
    font-style: italic;
    text-align: center;
  }
  .instruction {
    justify-self: flex-start;
  }
  .v-stepper {
    width: 100%;
    height: 100%;
  }
  .v-stepper__items, .v-stepper__content {
    height: calc(100vh - 36px);
  }
  .v-stepper__content {
    padding: 0 22px 30px;
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
    text-align: center;
  }
  li::marker {
    padding: 0;
    font-weight: bold;
  }
  .skip-btn {
    align-self: flex-end;
    position: relative;
    top: 47px;
    
    color: var(--grey-color);

    font-weight: bold;
    font-size: 1.3rem;

    flex: unset;

    border: 2.7px solid var(--grey-color);
  }
  .v-btn:not(.v-btn--round).v-size--default {
    height: 47px;
  }
</style>