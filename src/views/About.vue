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

    <v-footer>
      <strong> Spira - 2021 </strong>
    </v-footer>
  </v-container>
</template>

<script>

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
  .v-footer {
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
  .v-btn:not(.v-btn--round).v-size--default {
    min-width: 0px;

  }
  .v-btn {
    border-radius: 32px;
  }
</style>