<template>
  <v-btn
    @click="toggleMic"
    :color="activeMic ? 'red' : ''"
  >{{ activeMic ? 'Gravando' : 'Gravar' }}</v-btn>
</template>

<script>
import AudioRecorder from 'audio-recorder-polyfill';
import { openDB, deleteDB, wrap, unwrap } from 'idb';
window.MediaRecorder = AudioRecorder;
// rtcRtpTransceiver.setCodecPreferences([{}]);

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
            // O uso de noiseSuppression cria degraus no volume de voz
            // O uso de echoCancellation cria pequenos desvios na voz (não mto perceptiveis)
            // O uso de autoGainControl torna a voz um pouco mais audivel ajustando o volume de
            // forma suave, resta saber se causa grande alteração no esquema
            const stream = await navigator.mediaDevices.getUserMedia({ 
              audio: {
                noiseSuppression: false,
                echoCancellation: false,
                autoGainControl: true,
              } 
            })
            // await stream.getAudioTracks()[0].applyConstraints({
            //   noiseSuppression: false,
            //   autoGainControl: true,
            //   echoCancellation: false,
            // });
            console.log("noiseSuppression: ", stream.getAudioTracks()[0].getSettings());
            this.mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/PCMU'});
            this.mediaRecorder.start();

            let chunks = [];
            this.mediaRecorder.ondataavailable = ( e => {
              chunks.push(e.data);
            })

            // this.mediaRecorder.onstop = (() => {
            //   const blob = new Blob(chunks, {'type': 'audio/ogg; codecs=opus'});
            //   chunks = [];
            //   const audioURL = window.URL.createObjectURL(blob);
            //   this.$emit('newAudio', audioURL);
            // })
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
          this.mediaRecorder.stream.getTracks().forEach(track => {
            track.stop();
          })
        }
        this.activeMic = !this.activeMic;
      }
    },
  }
}
</script>

<style>

</style>