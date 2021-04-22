<template>
  <v-btn
    outlined
    rounded
    block
    :disabled="micState > 2"
    @click="toggleMic"
    :color="micState == 0 ? '' : micState == 1 ? 'red' : 'var(--purple-color)'"
    class="recorder"
  >{{ micState == 0 ? 'gravar' : micState == 1 ? 'gravando' : 'pronto' }}</v-btn>
</template>

<script>
import AudioRecorder from 'audio-recorder-polyfill';
window.MediaRecorder = AudioRecorder;

export default {
  name: "Microphone",
  props: ['noiseSuppression', 'echoCancellation', 'autoGainControl'],
  data: () => ({
    micState: 0,
    mediaRecorder: undefined,
  }),
  methods: {
    async toggleMic() {
      for (let audio in this.activeAudio) {
        if (this.activeAudio[audio])
          this.sound[audio].stop();
        this.activeAudio[audio] = false;
      }
      if (this.micState == 0) {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          try {
            // O uso de noiseSuppression cria degraus no volume de voz
            // O uso de echoCancellation cria pequenos desvios na voz (não mto perceptiveis)
            // O uso de autoGainControl torna a voz um pouco mais audivel ajustando o volume de
            // forma suave, resta saber se causa grande alteração no esquema
            const stream = await navigator.mediaDevices.getUserMedia({ 
              audio: {
                noiseSuppression: this.noiseSuppression,
                echoCancellation: this.echoCancellation,
                autoGainControl: this.autoGainControl,
              } 
            })
            
            this.mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/PCMU'});
            this.mediaRecorder.start();

            let chunks = [];
            this.mediaRecorder.ondataavailable = ( e => {
              chunks.push(e.data);
            })

            this.mediaRecorder.addEventListener('dataavailable', e => {
             const audioURL = window.URL.createObjectURL(e.data);
             this.$emit('newAudio', audioURL);
            })
            
            this.micState = 1;
          }
          catch (err) {
            console.error('The following getUserMedia error occurred: ' + err);
          }
        } 
        else {
          console.error('getUserMedia not supported on your browser!');
        }
      }
      else if (this.micState == 1){
        if (this.mediaRecorder) {
          this.mediaRecorder.stop();
          this.mediaRecorder.stream.getTracks().forEach(track => {
            track.stop();
          })
        }
        this.micState = 2;
      }
      else {
        this.$emit('ready');
      }
    },
  }
}
</script>

<style scoped>
  .recorder {
    margin-bottom: 0.5rem;
    display: flex;
    justify-self: flex-start;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    height: 60px;
  }
  .v-btn {
    text-transform: none;
    letter-spacing: inherit;
    font-weight: normal;
  }
</style>