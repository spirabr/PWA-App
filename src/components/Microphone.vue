<template>
  <v-container class="microphone">
    <v-btn 
      v-show="micState == 4 && Reset"
      outlined
      rounded
      block
      color="var(--grey-color-faded)"
      class="reset"
      @click="reset"
    >
    refazer gravação
    </v-btn>
    <v-btn
      :outlined="micState < 4"
      rounded
      block
      :color="btnColor"
      :class="micState < 4 ? '' : 'advance'"
      @click="toggleMic"
    >{{ btnText }}
    </v-btn>
  </v-container>
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
          return 'var(--purple-color)';
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
  .container .microphone {
    height: calc(17px + 2*47px);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    
    align-self: flex-end;
    padding: 0;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    height: 47px;
  }
  .v-btn:not(.v-btn--round).v-size--default .reset {
    height: 30px;
  }
  .v-btn {
    text-transform: none;
    letter-spacing: inherit;
    font-weight: bold;
    
    align-self: flex-start;
    border: 2.7px solid;

    flex: unset;
  }
  .v-btn.v-size--default {
    font-size: 1.3rem;
  }
  .container .reset {
    height: 47px;
    width: 276px;
    opacity: 66%;
    margin-bottom: 17px;
  }
  .advance {
    color: white;
  }
</style>