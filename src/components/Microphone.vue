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
    async toggleMic() {
      for (let audio in this.activeAudio) {
        if (this.activeAudio[audio])
          this.sound[audio].stop();
        this.activeAudio[audio] = false;
      }
      console.log(this.activeMic);
      if (!this.activeMic) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
          stream.getTracks().forEach(track => track.stop());
          this.recorder.start();
          this.activeMic = !this.activeMic;
        }
        catch (error) {
          console.error(error);
          alert('Voce não permitiu o uso do microfone!')
          return;
        }
      }
      else {
        this.activeMic = !this.activeMic;
        console.log('Retorno: ', this.recorder.stop());
        this.$emit('newAudio');
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