<template>
  <v-container>
    <h1>Ops! Parece que você entrou em uma página que não existe!</h1>
    <router-link to="/">
      <v-btn>
        Voltar para a página principal
      </v-btn>
    </router-link>

    <v-footer>
      <strong>Spira - 2021</strong>
    </v-footer>
  </v-container>
</template>

<script>
export default {

}
</script>

<style scoped>
  .container h1 {
    margin-bottom: 2rem;
  }
  .container a {
    text-decoration: none;
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