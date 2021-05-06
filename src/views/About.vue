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
        <h1>sobre o spira</h1>
      </div>
      <hr>
    </header>

    <main>
      <div class="placeholder">
        <p>Texto descritivo sobre o projeto SPIRA</p>
      </div>
    </main>

    <Footer></Footer>
  </v-container>
</template>

<script>
export default {
  name: 'About',
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