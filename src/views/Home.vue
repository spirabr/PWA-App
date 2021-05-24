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
      <router-link to="/gather/form">
        <v-btn
          outlined
          block
          rounded
          large
          class="route-button"
        >
          iniciar coleta
        </v-btn>
      </router-link>

      <router-link to="/upload">
        <v-btn
          outlined
          block
          rounded
          large
          class="route-button"
        >
          upload
        </v-btn>
      </router-link>
      
      <router-link to="/about">
        <v-btn
          outlined
          block
          rounded
          large
          class="route-button"  
        >
          sobre o spira
        </v-btn>
      </router-link>

    </div>

  </v-container>
</template>

<script>

export default {
  name: 'Home'
}
</script>

<style scoped>
  .container {
    height: 100%;
    width: 100%;

    padding: 24px 18px;
    position: relative;
  }
  .logo {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .buttons {
    width: 100%;
    height: 100%;

    position: relative;
    padding-bottom: 3.2rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;

  }
  .v-size--large {
    font-weight: bold;
    font-size: 1.3rem;
  }
  .buttons a {
    color: black; 
    text-decoration: none;

    margin-bottom: 0.5rem;
  }
  .route-button {
    margin-top: 1rem;
    margin-bottom: 2rem;
    width: 100%;
  }
  video {
    height: 100%;
    width: 100%;
    max-height: 215px;
    max-width: 255px;
  }
</style>