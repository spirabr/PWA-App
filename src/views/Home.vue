<template>
  <v-container>
    <div class="logo">
      <video 
        autoplay
        muted
        src='../../public/img/video/Spira_logo_anim.webm'
      ></video>
    </div>
    
    <div class="buttons">

      <v-btn
        block
        rounded
        large
        color="var(--purple-color)"
        class="route-button"
        @click="goToColeta"
      >
        iniciar {{formButtomLabel}}
      </v-btn>

      <v-btn
        block
        rounded
        large
        color="var(--purple-color)"
        class="route-button"
        @click="goToUpload"
      >
        upload
      </v-btn>

      <v-btn
        block
        rounded
        large
        color="var(--purple-color)"
        class="route-button"
        @click="goToAbout"
      >
        sobre o spira
      </v-btn>

      <v-btn
        block
        rounded
        large
        color="var(--purple-color)"
        class="route-button"
        link
        to="/settings"
      >
        realizar teste
      </v-btn>
    </div>

  </v-container>
</template>

<script>
import router from '@/router';
import { hasToken } from '@/services/auth';
import { isInferenceApp } from './Settings.js';

export default {
  name: 'Home',
  methods: {
    goToColeta() {
      router.push('/gather/form');
    },
    goToUpload() {
      router.push('/upload');
    },
    goToAbout() {
      router.push('/about');
    },
  },
  mounted () {
    if(!hasToken(this)){
      this.$router.push('/signin');
    }
  },
  data: () => ({
    formButtomLabel: isInferenceApp() ? 'inferência': 'coleta',
  }),
};
</script>

<style scoped>
  .container {
    height: 100%;
    width: 100%;

    padding: 30px 22px;
  }
  .logo {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .route-button {
    margin-top: 16px;
    margin-bottom: 0px;
  }
  .buttons {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .v-size--large {
    font-weight: bold;
    font-size: 18.5px;

    color: white;
  }
  .v-btn--block {
    flex: unset;
  }
  .v-btn:not(.v-btn--round).v-size--large {
    height: 47px;
  }
  video {
    height: 100%;
    width: 100%;
    max-height: 215px;
    max-width: 255px;
  }
</style>