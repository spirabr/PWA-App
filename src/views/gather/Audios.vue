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
              <h1>Aceite</h1>
              <p class="label">[Título 4.1-1]</p>
            </div>
            <div class="placeholder">
              <p>Termos para gravação:</p>
              <p class="label">[Texto 4.1-2]</p>
            </div>
            <div class="placeholder">
              <ol>
                <li>
                  Doe sua voz
                  <p class="label">[Termo 4.1-3]</p>
                </li>
                <li> 
                  Doe sua voz
                  <p class="label">[Termo 4.1-4]</p>
                </li>
                <li> 
                  Doe sua voz
                  <p class="label">[Termo 4.1-5]</p>
                </li>
                <li> 
                  Doe sua voz
                  <p class="label">[Termo 4.1-6]</p>
                </li>
              </ol>
            </div>
          </div>

          <Microphone 
            class="recorder"
          />
          <v-btn
            color="#500486"
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
            color="#500486"
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
            color="#500486"
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
              <h1>Frase lida</h1>
              <p class="label">[Título 7.1-1]</p>
            </div>
            <div class="placeholder">
              <p>Leia a frase a seguir em voz alta</p>
              <p class="label">[Texto 7.1-2]</p>
            </div>
          </div>

          <Microphone/>

          <router-link to="/gather/done">
            <v-btn 
              block
              color="#500486"
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

export default {
  name: 'Gather',
  data: () => ({
    cur_step: 1,
    carousel: 1,
  }),
  components: { Microphone }
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
  a {
    text-decoration: none;
  } 
</style>