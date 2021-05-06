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
  .v-size--large {
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
</style>