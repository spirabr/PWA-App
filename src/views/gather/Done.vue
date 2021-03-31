<template>
  <v-container>
    <div class="placeholder">
      <h1>Obrigado por Participar da coleta!</h1>
      <p class="label">[Título 8.1-1]</p>
    </div>
    <v-icon
      x-large
      color="green"
      class="done-icon"
    >mdi-check</v-icon>
    <router-link to="/">
      <v-btn
        color="#500486"
        block
        class="back-home placeholder"
      >
        Voltar para o início
        <p class="label"> [Botão 8.1-2] </p>
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