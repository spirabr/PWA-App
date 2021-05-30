<template>
  <v-container>
    <router-link to="/">
      <v-icon 
        class="close-btn"
        color="var(--purple-color)"
        x-large
      >
        mdi-window-close
      </v-icon>
    </router-link>

    <h1>sobre o spira</h1>

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
    padding: 24px 22px;
    display: flex;
    flex-direction: column;
  }
  h1 {
    margin: 0 0 35px 0;
  }
  .container main {
    width: 100%;
    height: 100%;

    display: flex;
    place-items: center top;
  }
  p {
    text-align: left;
    font-weight: normal;
    color: #707070;
    padding-bottom: 3%;
  }
  .container main {
    width: 100%;
  }
  .close-btn {
    position: absolute;
    top: 0.5rem;
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