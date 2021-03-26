<template>
  <v-container>
    <v-btn
        class="route-button"  
        rounded
        color="Red"
      >
        <router-link to="/" style="none">Home</router-link>
      </v-btn>
      
    <div class="recorder">
      <p>Clique no botão para gravar um áudio</p>  
      <Microphone @newAudio="addNewAudio"/>
    </div>

    <div class="listener">
      <p>Clique no fone para ouvir o áudio</p>
      <v-card 
        v-for="(audio, index) in audios"
        :key="index"
      >
        <v-card-title>{{"Audio " + (index + 1)}}</v-card-title>
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
  name: 'TestAudio',
  data: () => ({
    activeAudio: {},
    audios: [],
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
            src: [selected],
            format: "wav",
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
    addNewAudio(url) {
      this.$set(this.activeAudio, url, false);
      this.audios.push(url);
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
  .v-btn a {
    text-decoration: none;
    color: black;
  }
  .container {
    display: flex;
    flex-direction: column;
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
</style>