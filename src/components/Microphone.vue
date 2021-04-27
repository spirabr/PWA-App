<template>
  <div>
    <v-btn
      :outlined="micState != 1"
      rounded
      block
      :disabled="micState > 2"
      :color="micState == 0 ? '' : micState == 1 ? 'red' : 'var(--purple-color)'"
      :class="micState == 1 ? 'recorder white--text' : 'recorder'"
      @click="toggleMic"
    >{{ micState == 0 ? 'gravar' : micState == 1 ? 'gravando' : 'pronto' }}
    </v-btn>
    <v-btn 
      v-if="micState == 2"
      outlined
      rounded
      block
      :color="activateListeningButton"
      class="listener"
      @click="listen"
    >
      <v-icon>
        {{ activeSpeakers ? 'mdi-pause' : 'mdi-arrow-right-drop-circle' }}
      </v-icon>
      {{ activeSpeakers ? 'pausar' : 'escutar gravação' }}
    </v-btn>
    <a 
      v-if="micState == 2"
      @click="reset"
      class="reset"
    > Refazer audio </a>
  </div>
</template>

<script>
import AudioRecorder from 'audio-recorder-polyfill';
import { Howl } from 'howler';
window.MediaRecorder = AudioRecorder;

let time_out_id;

export default {
  name: "Microphone",
  data: () => ({
    micState: 0,
    audioURL: '',
    mediaRecorder: undefined,
    activeSpeakers: false,
    listener: undefined,
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
                noiseSuppression: false,
                echoCancellation: false,
                autoGainControl: false,
              } 
            })

            this.mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/PCMU'});
            this.mediaRecorder.start();

            let chunks = [];
            this.mediaRecorder.ondataavailable = ( e => {
              chunks.push(e.data);
            })

            this.mediaRecorder.addEventListener('dataavailable', e => {
             this.audioURL = window.URL.createObjectURL(e.data);
             this.$emit('newAudio', this.audioURL);
            })
            
            this.micState = 1;
          }
          catch (err) {
            console.log('The following getUserMedia error occurred: ' + err);
          }
        } 
        else {
          console.log('getUserMedia not supported on your browser!');
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
        if (this.listener) {
          this.listener.stop();
        }
        this.$emit('ready');
      }
    },
    listen() {
      if (!this.activeSpeakers) {
        this.activeSpeakers = true;
        if (this.listener === undefined) {
          this.listener = new Howl({
            src: [this.audioURL],
            format: "wav",
            onend: () => {
              this.activeSpeakers = false;
            }
          })
        }
        this.listener.play();
      }
      else {
        this.listener.stop();
        this.activeSpeakers = false;
      }
    },
    wait() {
      time_out_id = setTimeout(this.reset, 2);
      console.log("Set timeout: ", time_out_id);
    },
    cancel() {
      clearTimeout(time_out_id);
      console.log("canceled timeout: ", time_out_id);
    },
    reset() {
      this.audioURL = '';
      this.micState = 0;
      time_out_id = 0;
    }
  },
  computed: {
    activateListeningButton() {
      return this.activeSpeakers ? 'green' : 'blue'
    },
  }
}
</script>

<style scoped>
  .recorder {
    display: flex;
    justify-self: flex-start;
    bottom: 4rem;
  }
  .listener {
    bottom: 8.5rem;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    height: 60px;
  }
  .v-btn {
    position: absolute;
    right: 0;
    text-transform: none;
    letter-spacing: inherit;
    font-weight: normal;
  }
  .reset {
    position: absolute;
    right: 0;
    text-align: left;
    color: red;
    width: 100%;
    height: 10px;
    bottom: 3rem;
  }
</style>