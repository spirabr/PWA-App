<template>
  <v-container>
    <v-img 
      src='../assets/spira_ico.png'
      contain
      max-height="100"
      max-width="200"
    ></v-img>
    
    <h1>SPIRA</h1>
    
    <v-btn
      rounded
    >
      <router-link class="accept-link" to="/accept">Fazer nova coleta</router-link>
    </v-btn>

    <div class="recorder">
      <p>Clique no microfone para gravar um áudio</p>  
      <Microphone/>
    </div>

    <div class="listener">
      <p>Clique no fone para ouvir o áudio</p>
      <v-card 
        v-for="(audio, index) in audios"
        :key="index"
      >
        <v-card-title>{{ audio }}</v-card-title>
        <v-icon
          v-on:click="listen(audio)"
          medium
          :color="toggleAudio(audio)"
        >mdi-headphones</v-icon>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { Howl } from 'howler';
import Microphone from '../components/Microphone'

export default {
  name: 'Home',
  data: () => ({
    activeAudio: {},
    audios: ['RandomSample1.wav', 'AfricanSample.wav', 'HouseSample.wav'],
    sound: {},
  }),
  components: {Microphone},
  methods: {
    listen(selected) {
      if (this.activeAudio[selected]) {
        this.sound[selected].stop();
      }
      else {
        if (this.sound[selected] === undefined) {
          this.sound[selected] = new Howl({
            src: [require(`../assets/audio/${selected}`)],
            onend: () => {
              this.activeAudio[selected] = false;
            }
          })
        }
        this.sound[selected].play();
      }
      this.activeAudio[selected] = !this.activeAudio[selected];
    },
    toggleAudio(selected) {
      return this.activeAudio[selected] ? 'red' : '';
    },
    newAudio: e => {
      console.log('evento enviado: ', e);
    }
  },
  created() {
    this.audios.forEach(audio => {
      this.$set(this.activeAudio, audio, false);
    })
  }
}
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .recorder, .listener {
    width: 100%;
    margin: 1rem;
    display: inherit;
    flex-direction: inherit;
    align-items: inherit;
  }
  button {
    outline: none;
  }
  .v-card {
    margin: 0.5em;
    width: 100%;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .accept-link {
    color: black; 
    text-decoration: none;
  }
</style>