<template>
  <v-container :class="containerHeight">
    <v-btn 
      v-show="micState == 4 && reset"
      outlined
      rounded
      color="var(--grey-color-faded)"
      class="reset"
      @click="resetBtn"
    >
      refazer gravação
    </v-btn>
    <v-btn
      :outlined="micState < 4"
      rounded
      :color="btnColor"
      :class="micState < 4 ? '' : 'advance'"
      @click="toggleMic"
    >{{ btnText }}
    </v-btn>
  </v-container>
</template>

<script>
import { Howl } from 'howler';
import getAudioConfigs from '@/services/audioConfigs';
import { MediaRecorder, register } from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';

export default {
  name: 'Microphone',
  props: {
    reset: {
      type: Boolean, 
      default: true
    }
  },
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
            audio: getAudioConfigs(),
          });

          this.mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/wav'});

          this.mediaRecorder.addEventListener('dataavailable', e => {
            console.log(e);
            this.audioURL = window.URL.createObjectURL(e.data);
            this.$emit('newAudio', this.audioURL);
          });
          
          this.mediaRecorder.start();
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
        console.log(this.mediaRecorder);
        this.mediaRecorder.stop();
      }
    },

    listen() {
      if (this.listener === undefined) {
        this.listener = new Howl({
          src: [this.audioURL],
          format: 'wav',
          onend: () => {
            if (this.micState < 4) {
              this.micState = 4;
            }
          }
        });
      }
      this.listener.play();
    },

    async toggleMic() {
      if (this.micState == 0) {
        await this.activateMicrophone();
      }
      else if (this.micState == 1){
        this.stopMicrophone();
        if (!this.reset) {
          this.micState = 4;
        }
        this.micState = 2;
      }
      else if (this.micState == 2) {
        this.listen();
        this.micState = 3;
      }
      else if (this.micState == 3) {
        this.listener.stop();
        this.micState = 4;
      }
      else {
        this.$emit('ready');
      }
    },
    resetBtn() {
      this.audioURL = '';
      this.micState = 0;
      this.listener = undefined;
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
        return 'parar reprodução';
      default:
        return 'avançar';
      }
    },
    containerHeight() {
      return {microphone: true, microphoneAfterRecorded: this.micState === 4, microphoneBeforeRecorded: this.micState != 4};
    },
  },
  async created() {
    await register(await connect());
  }
};
</script>

<style scoped>
  .container .microphone {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    
    align-self: flex-end;
    padding: 0;

    position: fixed;
    bottom: 22px;
    left: 30px;

    width: calc(100% - 2*30px);
  }
  .container .microphoneAfterRecorded {
    height: calc(17px + 2*47px);
  }
  .container .microphoneBeforeRecorded {
    height: calc(17px + 47px);
  }
  .v-btn {
    text-transform: none;
    letter-spacing: inherit;
    font-weight: bold;
    font-size: 1.3rem;

    display: flex;
    flex: unset;
    max-width: auto;

    border: 2.7px solid;

    background: white;

    width: 100%;
    height: 47px !important;
  }
  .container .reset {
    margin-bottom: 17px;
  }
  .advance {
    color: white;
  }
</style>