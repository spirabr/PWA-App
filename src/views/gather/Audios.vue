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
            <h1>Titulo1</h1>
            <p>Texto1</p>
          </div>

          <Microphone 
            class="recorder"
          />
          <v-btn
            color="#500486"
            @click="cur_step = 2; carousel = 1"
            class="ready-btn"
            block
          >
            Pronto
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <div>
            <h1>Titulo2</h1>
            <p>Texto2</p>
          </div>

          <Microphone/>

          <v-btn
            color="#500486"
            @click="cur_step = 3"
            class="ready-btn"
            block
          >
            Pronto
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <div>
            <h1>Titulo3</h1>
            <p>Texto3</p>
          </div>

          <Microphone/>

          <v-btn
            color="#500486"
            @click="cur_step = 4"
            class="ready-btn"
            block
          >
            Pronto
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="4">
          <div>
            <h1>Titulo4</h1>
            <p> Texto4 </p>
          </div>

          <Microphone/>

          <router-link to="/gather/done">
            <v-btn 
              block
              color="#500486"
              class="ready-btn"
            >
              Pronto
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
</style>