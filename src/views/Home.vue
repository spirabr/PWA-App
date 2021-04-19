<template>
  <v-container>
    <div class="logo">
      <v-img 
        src='../../public/img/video/logo_spira_anim.gif'
        contain
        height="100%"
        width="100%"
        max-height="215"
        max-width="255"
      ></v-img>
    </div>
    
    <div class="buttons">
      <router-link to="/gather/form">
        <v-btn
          class="route-button"
          rounded
          large
        >
          Iniciar coleta
        </v-btn>
      </router-link>
      
      <router-link to="/about">
        <v-btn
          class="route-button"  
          rounded
          large
        >
          Sobre o Spira
        </v-btn>
      </router-link>

      <router-link to="/test">
        <v-btn
          class="route-button"
          rounded
          large
        >
          Teste de áudio
        </v-btn>
      </router-link>
      
    </div>

    <Footer/>
  </v-container>
</template>

<script>
import Footer from '@/components/Footer'

export default {
  name: 'Home',
  components: {Footer}
}
</script>

<style scoped>
  .container {
    height: 100%;
    width: 100%;

    padding: 24px 18px;
    position: relative;
  }
  .logo{
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
  .buttons a {
    color: black; 
    text-decoration: none;

    margin-bottom: 0.5rem;
  }
  .v-btn.v-size--large {
    font-size: 1rem;
  }
  .route-button {
    margin-top: 1rem;
    margin-bottom: 2rem;
    width: 100%;
  }
</style>