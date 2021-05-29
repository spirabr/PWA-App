<template>
  <div>
    <v-btn 
      v-if="micState == 4 && Reset"
      outlined
      rounded
      block
      class="reset"
      @click="reset"
    >
    refazer gravação
    </v-btn>
    <v-btn
      outlined
      rounded
      block
      :color="btnColor"
      class="recorder"
      @click="toggleMic"
    >{{ btnText }}
    </v-btn>
  </div>
</template>

<script>
import AudioRecorder from 'audio-recorder-polyfill';
import { Howl } from 'howler';
window.MediaRecorder = AudioRecorder;

let time_out_id;

export default {
  name: "Microphone",
  props: [ 'Reset' ],
  data: () => ({
    micState: 0,
    audioURL: '',
    mediaRecorder: undefined,
    listener: undefined,
  }),
  methods: {
    async activateMicrophone() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
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
          console.error('The following getUserMedia error occurred: ' + err);
        }
      } 
      else {
        console.error('getUserMedia not supported on your browser!');
      }
    },

    stopMicrophone() {
      if (this.mediaRecorder) {
        this.mediaRecorder.stop();
        this.mediaRecorder.stream.getTracks().forEach(track => {
          track.stop();
        })
      }
      this.micState = 2;
    },

    listen() {
      if (this.listener === undefined) {
        this.listener = new Howl({
          src: [this.audioURL],
          format: "wav",
          onend: () => {
            if (this.micState < 4) {
              this.micState = 4;
            }
          }
        })
      }
      this.micState = 3;
      this.listener.play();
    },

    async toggleMic() {
      if (this.micState == 0) {
        await this.activateMicrophone();
      }
      else if (this.micState == 1){
        this.stopMicrophone();
        if (!this.Reset) {
          this.micState = 4
        }
      }
      else if (this.micState == 2) {
        this.listen();
      }
      else if (this.micState == 3) {
        this.listener.stop();
        this.micState = 4;
      }
      else {
        this.$emit('ready');
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
    btnColor() {
      switch(this.micState) {
        case 0:
          return '';
        case 1:
          return 'red';
        case 2:
          return 'blue';
        case 3:
          return 'green';
        default:
          return 'var(--purple-color)';
      }
    },
    btnText() {
      switch(this.micState) {
        case 0:
          return 'gravar';
        case 1:
          return 'gravando';
        case 2:
          return 'escutar gravação';
        case 3:
          return 'parar gravação';
        default:
          return 'avançar';
      }
    }
  }
}
</script>

<style scoped>
  .recorder {
    margin-top: 1rem;
    display: flex;
    align-self: start;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    height: 60px;
    width: 93%;
  }
  .v-btn:not(.v-btn--round).v-size--default .reset {
    height: 30px;
  }
  .v-btn {
    position: absolute;
    text-transform: none;
    letter-spacing: inherit;
    font-weight: bold;
    right: 0;
    bottom: 4rem;
    
    border: 2.7px solid;
  }
  .v-btn.v-size--default {
    font-size: 1.3rem;
  }
  .container .reset{
    position: absolute;
    right: 0;
    text-align: left;
    width: 50%;
    height: 10px;
    bottom: 8.5rem;
  }
</style>