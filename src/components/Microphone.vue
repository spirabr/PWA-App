<template>
  <v-btn
    @click="toggleMic"
    :color="activeMic ? 'red' : ''"
  >{{ activeMic ? 'Gravando' : 'Gravar' }}</v-btn>
</template>

<script>
import { AudioRecorder } from '../lib/recorder'

export default {
  name: "Microphone",
  data: () => ({
    activeMic: false,
    recorder: undefined,
  }),
  methods: {
    toggleMic() {
      this.activeMic = !this.activeMic;
      for (let audio in this.activeAudio) {
        if (this.activeAudio[audio])
          this.sound[audio].stop();
        this.activeAudio[audio] = false;
      }
      if (this.activeMic) {
        this.recorder.start();
        //this.recorder.start();
      }
      else {
        this.recorder.stop();
      }
      // Create an audio and store it at assets/audios with a 'nameHere.wav'
      // audios.push('nameHere.wav');
      // activeMic['nameHere.wav'] = false;
    },
  },
  created() {
    this.recorder = new AudioRecorder({
      beforeRecording: () => console.log('nada'),
      pauseRecording: () => console.log('nada'),
      afterRecording: () => console.log('nada'),
      micFailed: () => console.log('nada'),
      encoderOptions: 'asdfasd',
    });
    console.log(this.recorder);
  }
}
</script>

<style>

</style>