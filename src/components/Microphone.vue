<template>
  <v-btn
    @click="toggleMic"
    :color="activeMic ? 'red' : ''"
  >{{ activeMic ? 'Gravando' : 'Gravar' }}</v-btn>
</template>

<script>
import AudioRecorder from 'audio-recorder-polyfill';
window.MediaRecorder = AudioRecorder;

export default {
  name: "Microphone",
  data: () => ({
    activeMic: false,
    mediaRecorder: undefined,
  }),
  methods: {
    async toggleMic() {
      for (let audio in this.activeAudio) {
        if (this.activeAudio[audio])
          this.sound[audio].stop();
        this.activeAudio[audio] = false;
      }
      if (!this.activeMic) {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.start();

            this.mediaRecorder.addEventListener('dataavailable', e => {
              const audioURL = window.URL.createObjectURL(e.data);
              this.$emit('newAudio', audioURL);
            })
            
            this.activeMic = !this.activeMic;
          }
          catch (err) {
            console.log('The following getUserMedia error occurred: ' + err);
          }
        } 
        else {
          console.log('getUserMedia not supported on your browser!');
        }
      }
      else {
        if (this.mediaRecorder) {
          this.mediaRecorder.stop();
        }
        this.activeMic = !this.activeMic;
      }
    },
  }
}
</script>

<style>

</style>