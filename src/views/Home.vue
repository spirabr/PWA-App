<template>
  <v-container>
    <div class="logo">
      <v-img 
        src='../assets/SpiraLogo.jpg'
        contain
        height="100%"
        width="100%"
        max-height="115"
        max-width="175"
      ></v-img>
      
      <h1>SPIRA</h1>
    </div>
    
    <div class="buttons">
      <router-link to="/gather/form">
        <v-btn
          class="route-button"
          rounded
          large
        >
          Fazer nova coleta
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
    align-items: center;
    padding: inherit inherit 0 inherit;
    position: relative;
  }
  .logo{
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .buttons a {
    color: black; 
    text-decoration: none;
  }
  .route-button {
    margin-top: 1rem;
    width: 100%;
  }
</style>