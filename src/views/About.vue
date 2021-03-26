<template>
  <v-container>
    <header>
      <v-btn
        class="ma-1"
        color="#500486"
        dark
      >
        <router-link to="/">
          <v-icon
            dark
            small
            center
          >
            mdi-arrow-left
          </v-icon>
        </router-link>          
      </v-btn>
      <h1>[Título 1.2-1]</h1>
      <hr>
    </header>

    <main>
      <p>[Texto 1.2-2]</p>
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
  }
  .container header h1 {
    width: 100%;
    text-align: center;
  }
  .container a {
    text-decoration: none;
    color: white;
  }
  .container main {
    width: 100%;
    height: 100%;

    display: flex;
    place-items: center;
  }
  .container main p {
    width: 100%;
    text-align: center;
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