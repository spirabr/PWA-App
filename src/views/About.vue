<template>
  <v-container>
    <router-link to="/">
      <v-icon 
        class="close-btn"
      >
        mdi-window-close
      </v-icon>
    </router-link>

    <header>
      <h1>sobre o spira</h1>
      <hr>
    </header>

    <main>
      <p>Texto descritivo sobre o projeto SPIRA</p>
    </main>

  </v-container>
</template>

<script>
export default {
  name: 'About',
}
</script>

<style scoped>
  .container {
    padding: 24px 18px;
    display: flex;
    flex-direction: column;
  }
  .container header {
    width: 100%;
    text-align: center;
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
  .close-btn {
    left: 0rem;
    top: 0rem;
    bottom: 1rem;
  }
  header {
    margin: 7.5% 0;
  }
  a {
    position: absolute;
    top: 1rem;
    left: 1rem;
    width: 0;
    height: 0;
    text-decoration: none;
  }
</style>