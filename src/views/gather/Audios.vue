<template>
  <v-container>
    <v-stepper v-model="cur_step">
      <v-stepper-header>
        <v-stepper-step
          step="1"
          :complete="cur_step > 1"
        >
          Aceite
        </v-stepper-step>
        
        <v-divider></v-divider>
        
        <v-stepper-step
          step="2"
          :complete="cur_step > 2"
        >
          Vogal Sustentada
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          step="3"
          :complete="cur_step > 3"
        >
          Parlenda
        </v-stepper-step>

        <v-divider></v-divider>

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
              <h1>TERMOS DE ACEITE</h1>
              <p class="label">[4.1-1]</p>
            </div>
            <div class="placeholder">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In viverra ac velit at pellentesque. Nullam eget pellentesque purus. Duis a orci ultrices, blandit diam nec, ultricies orci. Ut congue leo a massa varius, in pretium mauris vestibulum. Nam imperdiet vehicula facilisis. Fusce finibus mauris nec pharetra efficitur. Vivamus fermentum egestas lobortis. Nulla iaculis vel neque id ornare. Quisque quis consequat urna. Sed ac commodo purus. Morbi accumsan sapien ipsum, eget mollis turpis vulputate in. Quisque ut lectus at sem sodales aliquet et sed purus. Pellentesque tristique arcu ligula, quis facilisis ipsum condimentum at.
            </div>
          </div>

          <Microphone 
            class="recorder"
          />
          <v-btn
            color="var(--purple-color)"
            @click="cur_step = 2; carousel = 1"
            class="ready-btn placeholder"
            block
          >
            Pronto
            <p class="label"> [Botão 4.1-7] </p>
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <div>
            <div class="placeholder">
              <h1>Vogal Sustentada</h1>
              <p class="label">[Título 5.1-1]</p>
            </div>
            <div class="placeholder">
              <p>Inspire e fale a vogal "a" até acabar o ar</p>
              <p class="label">[Texto 5.1-2]</p>
            </div>
          </div>

          <Microphone/>

          <v-btn
            color="var(--purple-color)"
            @click="cur_step = 3"
            class="ready-btn placeholder"
            block
          >
            Pronto
            <p class="label"> [Botão 5.1-3] </p>
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <div>
            <div class="placeholder">
              <h1>Parlenda</h1>
              <p class="label">[Título 6.1-1]</p>
            </div>
            <div class="placeholder">
              <p>Recite uma frase que sabe de cor. 
                Pode ser uma oração ou uma frase clássica.
                Não cante a frase.
              </p>
              <p class="label">[Texto 6.1-2]</p>
            </div>
          </div>

          <Microphone/>

          <v-btn
            color="var(--purple-color)"
            @click="cur_step = 4"
            class="ready-btn placeholder"
            block
          >
            Pronto
            <p class="label"> [Botão 5.1-3] </p>
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="4">
          <div>
            <div class="placeholder">
              <h1> Frase lida </h1>
              <p> [Título 7.1-1]</p>
            </div>
            <div class="placeholder">
              <p>Leia a frase a seguir em voz alta</p>
              <p class="label">[Texto 7.1-2]</p>
            </div>
            <VTextMarquee :duration="10" :paused="scroll">
              <h1>
                ------------------------------------------------ 
                O amor ao próximo ajuda a enfrentar essa fase com a força que a gente precisa 
              </h1>
            </VTextMarquee>
          </div>

          <div @click="startCountdown()">
            <Microphone
              :noiseSuppression="false"
              :echoCancellation="false"
              :autoGainControl="false"
            />
          </div>

          <router-link to="/gather/done">
            <v-btn 
              block
              color="var(--purple-color)"
              class="ready-btn placeholder"
            >
              Pronto
              <p class="label"> [Botão 5.1-3] </p>
            </v-btn>
          </router-link>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import Microphone from '@/components/Microphone'
import VTextMarquee from 'vue-marquee-text-component'

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
  .v-stepper__wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .v-stepper__step__step {
    width: 100%;
    border-radius: 0%;
  }
  .ready-btn {
    color: white;
  }
  .container h1 {
    text-align: center;
  }
  .placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5% 0;
  }
  .placeholder h1 {
    margin-right: 10px;
  }
  .v-stepper__content {
    padding: 1% 7%;
  }
  a {
    text-decoration: none;
  } 
</style>