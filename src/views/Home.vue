<template>
  <v-container>
    <v-img 
      src='../assets/spira_ico.png'
      contain
      max-height="100"
      max-width="200"
    ></v-img>
    
    <h1>SPIRA</h1>
    
    <div class="recorder">
      <p>Clique no microfone para gravar um áudio</p>  
      <v-icon
        @click="toggleMic"
        x-large
        :color="activeMic ? 'red' : ''"
      >mdi-microphone</v-icon>
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

export default {
  name: 'Home',
  data: () => ({    
    activeMic: false,
    activeAudio: {},
    audios: ['RandomSample1.wav', 'AfricanSample.wav', 'HouseSample.wav'],
    sound: {}
  }),
  methods: {
    toggleMic() {
      this.activeMic = !this.activeMic;
      for (let audio in this.activeAudio) {
        if (this.activeAudio[audio])
          this.sound[audio].stop();
        this.activeAudio[audio] = false;
      }
      // Create an audio and store it at assets/audios with a 'nameHere.wav'
      // audios.push('nameHere.wav');
      // activeMic['nameHere.wav'] = false;
    },
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
      this.activeMic = false;
      this.activeAudio[selected] = !this.activeAudio[selected];
    },
    toggleAudio(selected) {
      return this.activeAudio[selected] ? 'red' : '';
    },
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
</style>