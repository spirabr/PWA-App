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
          :color="toggleAudio"
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
    activeAudio: false,
    audios: ['RandomSample1.wav', 'AfricanSample.wav', 'HouseSample.wav'],
    soundId: -1,
  }),
  methods: {
    toggleMic() {
      this.activeMic = !this.activeMic;
      this.activeAudio = false;
    },
    listen(selected) {
      this.activeAudio = !this.activeAudio;
      console.log('activeAudio: ', this.activeAudio);
      this.activeMic = false;
      const sound = new Howl({
        src: [require(`../assets/audio/${selected}`)],
        autoplay: true,
        onend: function() {
          this.activeAudio = false;
          this.soundId = -1;
          console.log(this.soundId);
        }
      })
      if (this.activeAudio) {
        this.soundId = sound.play();
        console.log(this.soundId);
      }
      else if (this.soundId !== -1) {
        sound.stop(this.soundID);
      }
    },  
  },
  computed: {
    toggleAudio() {
      return this.activeAudio ? 'red' : '';
    }
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