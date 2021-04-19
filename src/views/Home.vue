<template>
  <v-main>
    <v-container>
      <div class="logo">
        <v-img
          src='../../public/img/video/logo_spira_anim.gif'
          contain
          height="100%"
          width="100%"
          max-height="115"
          max-width="175"
        ></v-img>
      </div>

      <div class="buttons-container">
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
  </v-main>
</template>

<script>
import Footer from '@/components/Footer'

export default {
  name: 'Home',
  components: {Footer}
}
</script>

<style scoped>
  .logo {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .buttons-container {
    width: 100%;
    padding-bottom: 3rem;
  }

  .buttons-container a {
    color: black;
    text-decoration: none;
  }

  .v-btn.v-size--large {
    font-size: 1rem;
  }

  .route-button {
    margin-top: 1rem;
    width: 100%;
  }
</style>