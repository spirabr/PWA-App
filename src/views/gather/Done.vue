<template>
  <v-container>
    <h1>Título</h1>
    <v-icon
      x-large
      color="green"
      class="done-icon"
    >mdi-check</v-icon>
    <router-link to="/">
      <v-btn
        color="#500486"
        block
        class="back-home"
      >
        Voltar para o início
      </v-btn>
    </router-link>
  </v-container>
</template>

<script>
export default {

}
</script>

<style scoped>
  .back-home {
    color: white;
  }
  .done-icon {
    margin: 2rem;
  }
  .container a {
    text-decoration: none;
  }

</style>