<template>
  <v-container>
    <header>
      <router-link to="/">
        <v-btn
          class="ma-1"
          color="#500486"
          dark
        >
          <v-icon
            dark
            small
            center
          >
            mdi-arrow-left
          </v-icon>
        </v-btn>
      </router-link>
      <div class="placeholder">
        <h1>Sobre o Spira</h1>
        <p class="label">[Título 1.2-1]</p>
      </div>
      <hr>
    </header>

    <main>
      <div class="placeholder">
        <p>Spira é um projeto maneiro</p>
        <p class="label">[Texto 1.2-2]</p>
      </div>
    </main>

    <Footer></Footer>
  </v-container>
</template>

<script>
import Footer from '@/components/Footer'

export default {
  name: 'About',
  components: { Footer },
}
</script>

<style scoped>
  .container header {
    width: 100%;
    text-align: center;
  }
  .container a {
    text-decoration: none;
    color: white;
  }
  .container main{
    width: 100%;
    height: 100%;

    display: flex;
    place-items: center top;
  }
  .container main {
    width: 100%;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    min-width: 0px;
  }
  .v-btn {
    border-radius: 32px;
  }
</style>