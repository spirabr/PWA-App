<template>
  <v-container>
    <div class="logo">
      <v-img 
        src='../assets/spira_ico.png'
        contain
        max-height="100"
        max-width="200"
      ></v-img>
      
      <h1>SPIRA</h1>
    </div>
    
    <div class="buttons">
      <v-btn
        class="route-button"
        rounded
        x-large
      >
        <router-link to="/gather/form">Fazer nova coleta</router-link>
      </v-btn>
      <v-btn
        class="route-button"  
        rounded
        x-large
      >
        <router-link to="/about">Sobre o Spira</router-link>
      </v-btn>
      <v-btn
        class="route-button"  
        rounded
        x-large
      >
        <router-link to="/test">Teste de áudio</router-link>
      </v-btn>
    </div>

    <v-footer>
      <strong>Spira - 2021</strong>
    </v-footer>
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
    align-items: center;
    padding: 2rem 2rem 0 2rem;
    position: relative;
  }
  .logo{
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .route-button a {
    color: black; 
    text-decoration: none;
  }
  .route-button {
    margin-top: 1rem;
    width: 100%;
  }
  .v-footer {
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    bottom: 0;
    height: 50px;
    width: 100%;
  }
  .theme--light.v-footer {
    color: white;
    background-color: #500486;
  }
</style>